type Props = {
  png: string;
  webp: string;
  alt: string;
  className?: string;
};

const Picture = ({ png, webp, alt, className }: Props) => {
  return (
    <picture>
      <source src={webp} type="image/webp" />
      <img className={`image ${className}`} src={png} alt={alt} />
    </picture>
  );
};

export default Picture;
