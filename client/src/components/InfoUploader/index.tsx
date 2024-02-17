import { info2file } from "@/utils";
import { InboxOutlined } from "@ant-design/icons";
import { UploadProps, Upload, Card, Image as ImagePreview, Row, Col, message, Button, Popconfirm } from "antd";
import { useRef } from "react";

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
  onRemove,
  onPinned,
}) => {
  const draggerRef = useRef(null);
  const props: UploadProps = {
    name: 'file',
    maxCount,
    action: '/api/upload',
    accept: ".png, .jpg, .jpeg, .gif, .bmp,.webp",
    defaultFileList: info2file(files),
    showUploadList: false,
    beforeUpload: (file: any, fileList: any) => {
      return new Promise((resolve) => {
        console.log('fileList', fileList)
        if (files.length + 1 > maxCount) {
          message.error(`最多上传${maxCount}张图片`);
          return resolve(Upload.LIST_IGNORE);
        }
        const image = new Image();
        image.src = window.URL.createObjectURL(file);
        image.onerror = () => {
          message.error('图片格式不正确');
          return Upload.LIST_IGNORE;
        };
        image.onload = () => {
          if (width && height) {
            const componentRatio = image.width / image.height;
            const specifiedRatio = width / height;
            if (componentRatio.toFixed(2) !== specifiedRatio.toFixed(2)) {
              message.error(`图片宽高比例为${width}:${height}`);
              return resolve(Upload.LIST_IGNORE);
            }
          }
          return resolve(true);
        };
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
      <Row gutter={16}>
        {
          Array.isArray(files) && files.map((file, index) => {
            return (
              <Col style={{ marginBottom: '10px' }} className="gutter-row" span={6} key={file.id}>
                <ImagePreview src={file?.content} />
                <div className="flex" style={{ marginBottom: '5px' }}>
                  <Popconfirm
                    title="确认删除吗？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={async () => {
                      await onRemove(file.id)
                      console.log('draggerRef', draggerRef)
                    }}
                  >
                    <Button
                      style={{ marginTop: '5px', marginRight: '5px' }}
                      size="small"
                      type="primary"
                      danger
                    >
                      删除
                    </Button>
                  </Popconfirm>
                  {
                    index > 0 &&
                    <Button
                      style={{ marginTop: '5px' }}
                      size="small"
                      onClick={async () => {
                        debugger
                        await onPinned(file.id, index)
                      }}
                    >
                      置顶
                    </Button>
                  }
                </div>
              </Col>
            )
          })
        }
      </Row>

      <Dragger {...props} ref={draggerRef}>
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