import ReactLoading from "react-loading";

type LoadingProps = {
    width:string | number;
    height:string | number;
    color:string;
}

const Loading = ({
  width,
  height,
  color
} : LoadingProps) => {
    return (
        <ReactLoading width={width} height={height} color={color} type="spin" />
    )
}

export default Loading;