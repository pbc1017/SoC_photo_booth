from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from PIL import Image
import io
import os
import uuid

app = FastAPI()

# 정적 파일을 제공하기 위한 디렉토리 설정
app.mount("/images", StaticFiles(directory="images"), name="images")

@app.post("/create_collage/")
async def create_collage(
    image1: UploadFile = File(...),
    image2: UploadFile = File(...),
    image3: UploadFile = File(...),
    image4: UploadFile = File(...)
):
    # 배경 템플릿 이미지 로드
    overlay = Image.open("overlay_4.png")
    
    # 새 이미지 생성 (배경 크기에 맞춤)
    base_image = Image.new('RGBA', overlay.size, (255, 255, 255, 0))
    
    # 사용자 이미지 위치 및 크기 정의
    positions = [
        (65, 78, 463, 689),   # (x, y, width, height)
        (552, 78, 463, 689),
        (65, 789, 463, 689),
        (552, 789, 463, 689)
    ]
    
    # 사용자 이미지 처리 및 삽입
    for i, img_file in enumerate([image1, image2, image3, image4]):
        img_content = await img_file.read()
        img = Image.open(io.BytesIO(img_content))
        img = img.resize((positions[i][2], positions[i][3]))
        base_image.paste(img, (positions[i][0], positions[i][1]))
    
    # 오버레이 (배경 템플릿) 적용
    final_image = Image.alpha_composite(base_image, overlay)
    
    # 결과 이미지를 파일로 저장
    filename = f"{uuid.uuid4()}.png"
    file_path = os.path.join("images", filename)
    final_image.save(file_path, format='PNG')
    
    # 이미지 URL 생성
    image_url = f"{app.url_path_for('images')}/{filename}"
    
    return {"image_url": image_url}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)