import { InboxOutlined } from "@ant-design/icons";
import { UploadProps, Upload, Card, Image, Row, Col, message } from "antd";

const { Dragger } = Upload;

type InfoUploaderProps = {
  optionKey: string;
  label: string
  maxCount: number;
  type: string;
  width: number;
  height: number;
  files: any[];
}

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  beforeUpload(file) {
    // TODO:判断是否符合宽高比例
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const InfoUploader: React.FC<InfoUploaderProps> = ({
  optionKey,
  label,
  maxCount,
  files,
  type,
  width,
  height
}) => {
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
                <Image src={file?.content} />
              </Col>
            )
          })
        }
        {/* <Col className="gutter-row" span={6}>
          <Image src="https://www.changan.com.cn/cars_m/UNI-V/images/meitu/1.jpg" />
        </Col> */}
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