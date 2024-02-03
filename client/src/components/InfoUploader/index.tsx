import { InboxOutlined } from "@ant-design/icons";
import { UploadProps, Upload, Card, Image as ImagePreview, Row, Col, message } from "antd";

const { Dragger } = Upload;

type InfoUploaderProps = {
  optionKey: string;
  label: string
  maxCount: number;
  type: string;
  width: number;
  height: number;
  files: any[];
  onAdd: (info_key: string, type: string, content: string) => void;
  onRemove: (id: number) => void;
}

const InfoUploader: React.FC<InfoUploaderProps> = ({
  label,
  maxCount,
  files,
  optionKey,
  type,
  width,
  height,
  onAdd,
  onRemove
}) => {
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    accept: ".png, .jpg, .jpeg, .gif, .bmp,.webp",
    beforeUpload: (file: any) => {
      return new Promise((resolve) => {
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
      })
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        onAdd(
          optionKey,
          type,
          info?.file?.response?.data?.url || ''
        )
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Card style={{ marginBottom: '30px' }} title={
      <h3>
        {label}<span>({files?.length || 0} / {maxCount})</span>
      </h3>
    }>
      <Row style={{ marginBottom: '20px' }} gutter={16}>
        {
          Array.isArray(files) && files.map((file) => {
            return (
              <Col className="gutter-row" span={6} key={file}>
                <ImagePreview src={file?.content} />
              </Col>
            )
          })
        }
      </Row>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        <p className="ant-upload-hint">
          支持单次或批量上传
        </p>
      </Dragger>
    </Card>
  )
}
export default InfoUploader;