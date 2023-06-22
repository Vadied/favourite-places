export const getCameraRatio = (
  ratiosAvailable: string[],
  screenRatio: number
) => {
  const ratios = ratiosAvailable.map((value) => {
    const [width, height] = value.split(":");
    return parseInt(width) / parseInt(height);
  });

  const betterIndex = ratios.reduce((minIndex, ratio, i) => {
    const minDistance = screenRatio - ratios[minIndex];
    const distance = screenRatio - ratio;
    if (distance >= minDistance) return minIndex;

    return i;
  }, 0);
  return ratiosAvailable[betterIndex];
};
