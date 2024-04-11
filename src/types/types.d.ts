declare module "*.css" {
  const styles: { [key: string]: string };
  export = styles;
}

declare module "*.scss" {
  const styles: { [key: string]: string };
  export = styles;
}

declare module "*.jpeg";
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.woff";
declare module "*.woff2";
