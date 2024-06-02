import React from 'react';
import avatarStyles from './avatar.module.css';

interface AvatarProps {
  className?: string;
  src: string;
  width?: number;
  height?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  className = '',
  src,
  width = '98',
  height = '98',
}) => (
  <img
    className={`${className} ${avatarStyles.avatar}`}
    src={src}
    style={{ width: `${width}px`, height: `${height}px` }}
    alt="Изображение пользователя"
  />
);

export default Avatar;
