const sharp = require('sharp');
// 이미지 크기(cm 단위) 및 빈 캔버스 크기, 시작 위치 설정
const imageWidthCm = 4.5;
const imageHeightCm = 6;
const gapCm = 0.4;
const canvasWidthCm = 10.2;
const canvasHeightCm = 15.2;
const startLeftCm = 0.4;
const startTopCm = 0.6;

const DPI = 300;
const cmToPixel = (cm) => cm * 0.393700787 * DPI;

// cm -> 픽셀 단위로 변환
const imageWidthPx = Math.round(cmToPixel(imageWidthCm));
const imageHeightPx = Math.round(cmToPixel(imageHeightCm));
const gapPx = Math.round(cmToPixel(gapCm));
const canvasWidthPx = Math.round(cmToPixel(canvasWidthCm));
const canvasHeightPx = Math.round(cmToPixel(canvasHeightCm));
const startLeftPx = Math.round(cmToPixel(startLeftCm));
const startTopPx = Math.round(cmToPixel(startTopCm));

console.log(`canvasWidthCm: ${canvasWidthCm}, canvasWidthPx: ${canvasWidthPx}`);
console.log(
  `canvasHeightCm: ${canvasHeightCm}, canvasHeightPx: ${canvasHeightPx}`
);

// 합성할 이미지의 위치 정의
const positions = [
  { left: startLeftPx, top: startTopPx },
  { left: startLeftPx + imageWidthPx + gapPx, top: startTopPx },
  { left: startLeftPx, top: startTopPx + imageHeightPx + gapPx },
  {
    left: startLeftPx + imageWidthPx + gapPx,
    top: startTopPx + imageHeightPx + gapPx,
  },
];

async function combineImages(images, output, backgroundImagePath) {
  try {
    // 빈 캔버스 이미지 작성
    // const canvasImage = sharp({
    //   create: {
    //     width: Math.round(canvasWidthPx),
    //     height: Math.round(canvasHeightPx),
    //     channels: 4,
    //     background: { r: 189, g: 215, b: 238, alpha: 1 },
    //   },
    // });

    const canvasImage = sharp(backgroundImagePath).resize({
      width: Math.round(canvasWidthPx),
      height: Math.round(canvasHeightPx),
    });

    // 사용자 이미지 한번에 리사이즈 (4.5*6cm) & 위치 정보 포함
    // 프로그램 최적화 위해 비동기 처리함
    const resizedImages = await Promise.all(
      images.map((image, index) => {
        return sharp(image)
          .resize({
            width: Math.round(imageWidthPx),
            height: Math.round(imageHeightPx),
          })
          .rotate(90)
          .toBuffer()
          .then((resized) => ({
            input: resized,
            left: Math.round(positions[index].left),
            top: Math.round(positions[index].top),
          }));
      })
    );

    // 빈 캔버스 이미지에 사용자 이미지 합성
    await canvasImage
      .composite(resizedImages)
      .png({ compressionLevel: 0 })
      .toFile(output);

    console.log('이미지 합성 성공');
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { combineImages };
