import styled from "styled-components";

type Size = "S" | "M" | "L";

const SMALL_AVATAR = 32;
const MEDIUM_AVATAR = 40;
const LARGE_AVATAR = 48;

const getAvatarSize = (size: Size) => (size === "S" ? SMALL_AVATAR : size === "M" ? MEDIUM_AVATAR : LARGE_AVATAR);

export interface AvatarProps {
  size: Size;
  alt?: string;
  src?: string;
}

export default function Avatar({ alt, src, size }: AvatarProps) {
  return (
    <Root size={size} data-testid="avatar">
      {alt && !src && <Square>{alt.charAt(0)}</Square>}
      {src && <Image alt={alt} src={src} />}
    </Root>
  );
}

const Root = styled.div<{ size: AvatarProps["size"] }>`
  width: ${({ size }) => getAvatarSize(size!)}px;
  height: ${({ size }) => getAvatarSize(size)}px;
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
