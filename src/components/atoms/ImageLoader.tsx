type Props = {
  sourcePath: string
  width?: number
  height?: number
}

function ImageLoader({ sourcePath, width, height }: Props) {
  return <img src={sourcePath} alt="loading..." width={width} height={height} />
}
export default ImageLoader
