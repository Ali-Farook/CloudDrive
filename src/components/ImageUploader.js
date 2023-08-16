import React from 'react'
import  {useState} from 'react'
// import { InboxOutlined } from '@ant-design/icons';
// import { UploadProps } from 'antd';
// import { message, Upload } from 'antd';

const ImageUploader = () => {
  let imageArray = [];
    const [image, setImage] = useState(null);
    const onUpload = (event) => {
      let fileList = event.target.files
        if(fileList === 0){
          console.log("No image")
        }
        console.log(fileList[0].name)
        for (let i = 0; i < fileList.length; i++) {
          imageArray.push({name: fileList[i].name, url: fileList[i]})
        }
        setImage(imageArray)
    };
    const  UploadHandler= async ()=> {
      console.log(localStorage.getItem('auth-token'))
        const response = await fetch("http://localhost:5000/api/createImage", {
            method: 'POST',
            headers: {
                'Content-Type': 'image/jpeg',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({image})
        });
        const json = await response.json();
        console.log(json)
    };
  return (
    <div className='card'>
        <div className='top'>
          <p>Drag and Drop</p>
        </div>
        <div className='drag-area'>
          <span className='select'>Drop images here</span>
           drag and drop images here {" "}
           <span className='select'> Browse</span>
           <input className='file' type='file' onChange={onUpload} multiple/>
        </div>
        <div className='container'>
          <div className='image'>
          <span className='delete'>&times;</span>  
          </div>
        </div>
        <button onClick={UploadHandler}>Upload</button>
    </div>
  )
}

export default ImageUploader

// const { Dragger } = Upload;

// const props = {
//     name: 'file',
//     multiple: true,
//     accept: 
//     //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     onChange(info) {
//         console.log("Ali uid", info.file.uid)
//         const { status } = info.file;
//         if (status !== 'uploading') {
//             console.log("Both things = >", info.file, info.fileList);
//         }
//         if (status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully.`);
//         } else if (status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
//     onDrop(e) {
//         console.log('Dropped files', e.dataTransfer.files);
//     },
// };

// const ImageUploader = () => {
//     const [image, setImage] = useState();
//     const onUpload = (event) => {
//         let file = event.target.files
//         setImage(file);
//     };
//     function show() {
//         console.log(image)
//     };
//     return (
//         <>
//          <Dragger {...props} >
//              <p className="ant-upload-drag-icon">
//                  <InboxOutlined />
//              </p>
//              <p className="ant-upload-text">Click or drag file to this area to upload</p>
//              <p className="ant-upload-hint">
//                 Support for a single or bulk upload. Strictly prohibited from uploading company data or other
//                  banned files.
//              </p>
//          </Dragger>
//          <br/>
//          <button onClick={show} style={{backgroundColor:"dodgerblue"}}>Click me</button>
//          </>
        
        
//     )
// }


// export default ImageUploader;