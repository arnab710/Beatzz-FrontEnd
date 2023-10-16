import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
	width: ${(props) => (props.height ? `${props.height}px` : `1.5rem`)};
	height: ${(props) => (props.height ? `${props.width}px` : `1.5rem`)};
	animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
