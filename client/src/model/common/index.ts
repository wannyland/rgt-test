import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

// 검색 Param 기본 모델
export interface SearchParamModel extends PaginationModel {
  word?: string;
}

// 페이지네이션 기본 모델
export interface PaginationModel {
  per: number;
  page: number;
}

/**
 * API Model
 */

// 공통 API response 규격
export interface GenericResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 리스트 데이터 규격
export interface ExpansionResponseModel {
  isLast: boolean;
  totalCount: number;
}

/**
 * Style Models
 */

// Nav Props Model
export interface GlobalNav {
  navOpen: boolean;
}

// Table > Td Style Props
export interface StyledTdProps {
  $align?: "left" | "right" | "center";
}

// Table > Tr Style Props
export interface TrProps extends ComponentPropsWithoutRef<"tr"> {
  onClick?: VoidFunction;
}

// Table > Td Style Props
export interface TdProps
  extends ComponentPropsWithoutRef<"td">,
    PropsWithChildren {
  align?: "left" | "right" | "center";
}

export type InputConTainerProps = {
  $disabled?: boolean;
};

// 버튼 Props
export interface IButtonLoading {
  $loading?: boolean;
}

// 버튼 스타일 Type
export type ButtonStyleType = "primary" | "gray" | "negative";

export interface IButtonStyle {
  $style?: ButtonStyleType;
}
