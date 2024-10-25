import { IButtonLoading, IButtonStyle } from "model/common";
import styled, { css } from "styled-components";

const Disabled = css`
  &:disabled {
    background-color: #e6e8ec;
    border-color: #e6e8ec;
    color: #fff;
    cursor: not-allowed;
    &:hover {
      background-color: #e6e8ec;
      border-color: #e6e8ec;
    }
  }
`;

const ButtonLoading = css<IButtonLoading>`
  ${(p) =>
    p.$loading &&
    css`
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        vertical-align: middle;

        height: min(16px, 70%);
        aspect-ratio: 1/1;
        border-radius: 50%;
        background: radial-gradient(farthest-side, #ffffff 94%, #0000) top/3px
            3px no-repeat,
          conic-gradient(#0000 60%, #ffffff);
        -webkit-mask: radial-gradient(
          farthest-side,
          #0000 calc(100% - 3px),
          #000 0
        );
        animation: s3 0.8s infinite linear;
      }
      span {
        opacity: 0;
      }
    `}
  @keyframes s3 {
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(1turn);
    }
  }
`;

const ButtonStyle = css<IButtonStyle>`
  border: 1px solid;
  ${(p) =>
    p.$style === "primary" &&
    css`
      background-color: #007bff;
      border-color: #007bff;
      color: #fff;
      &:hover {
        background-color: blue;
        border-color: blue;
      }
      ${Disabled}
    `}

  ${(p) =>
    p.$style === "negative" &&
    css`
      background-color: #f4554a;
      border-color: #f4554a;
      color: #fff;
      &:hover {
        background-color: rgba(229, 79, 70, 1);
        border-color: rgba(229, 79, 70, 1);
      }
      ${Disabled}
    `}
`;

export const StyledButton = styled.button<IButtonStyle & IButtonLoading>`
  ${ButtonStyle}
  ${ButtonLoading}

  width: 20%;
  height: 40px;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  border-radius: 0.6rem;
  font-weight: 500;
  position: relative;
  cursor: pointer;

  span {
    font-size: inherit;
    color: inherit;
  }
`;
