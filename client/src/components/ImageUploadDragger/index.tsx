import { ProFormUploadDragger } from '@ant-design/pro-components';
import { Upload, message } from 'antd';

type UploadProps = {
  width?: number;
  height?: number;
  max?: number;
}

const ImageUploadDragger: React.FC<UploadProps> = ({ width, height, ...props}) => {
  const beforeUpload = (file: any) =>
    new Promise((resolve) => {
      const image = new Image();
      image.src = window.URL.createObjectURL(file);
      image.onerror = () => {
        message.error('图片格式不正确');
        return Upload.LIST_IGNORE;
      };
      // if (width && height) {
      //   image.onload = () => {
      //     const componentRatio = image.width / image.height;
      //     const specifiedRatio = width / height;
      //     if (componentRatio.toFixed(2) !== specifiedRatio.toFixed(2)) {
      //       message.error(`图片宽高比例为${width}:${height}`);
      //       return resolve(Upload.LIST_IGNORE);
      //     }
      //     return resolve(true);
      //   };
      // }
      return resolve(true);
    });

  return (
    <ProFormUploadDragger
      rules={[
        {
          required: true,
          message: '列表首图为必填项',
        },
      ]}
      {...props}
      width="xl"
      action={'/api/upload'}
      accept=".png, .jpg, .jpeg, .gif, .bmp,.webp"
      fieldProps={{
        name: 'file',
        listType: 'picture-card',
        beforeUpload
      }}
    />
  )
}
export default ImageUploadDragger;
