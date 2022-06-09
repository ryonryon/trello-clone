import styled from "styled-components";

export enum AvatarSize {
  S = 32,
  M = 40,
  L = 48,
}

export interface AvatarProps {
  alt?: string;
  src?: string;
  size?: AvatarSize;
}

export default function Avatar({ alt, src, size = AvatarSize.M }: AvatarProps) {
  return (
    <Root size={size} data-testid="avatar">
      {alt && !src && <Square>{alt.charAt(0)}</Square>}
      {src && <Image alt={alt} src={src} />}
    </Root>
  );
}

const Root = styled.div<{ size: AvatarSize }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const Square = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  font-family: sans-serif;
  font-size: 20px;
  background-color: #f9f9f9;
`;

const Image = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  object-fit: cover;
`;
