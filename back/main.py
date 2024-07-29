from fastapi import FastAPI, File, UploadFile, Response
from PIL import Image
import io

app = FastAPI()

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
    
    # 사용자 이미지 위치 및 크기 정의 (예시 값, 실제 템플릿에 맞게 조정 필요)
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
    
    # 결과 이미지를 바이트 스트림으로 변환
    img_byte_arr = io.BytesIO()
    final_image.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    
    return Response(content=img_byte_arr, media_type="image/png")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)