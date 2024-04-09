import ReactQuill from 'react-quill';
import { useCallback, useMemo, useRef } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../apis/firebase/firebaseConfig';

function LunchWrite(props) {

  const reactQuillRef = useRef();

  const quillImageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "true")
    input.click();

    input.onchange = async () => {

      const files = Array.from(input.files);

      for (let file of files) {
        const storageRef = ref(storage, `quill_image/${file.name}`);
        const uploadResponse = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadResponse.ref);

        const editor = reactQuillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", downloadURL);
        editor.setSelection(range.index + 1);
      }

    }

  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["image"]
      ],
      handlers: {
        image: quillImageHandler
      }
    }
  }), []);


  return (
    <div>
      <h2>타이틀</h2>
      <input
        placeholder='제목'
      />

      <div>
        카테고리 선택
        <br></br>
        중식
        <input type="checkbox" />
        일식
        <input type="checkbox" />
        한식
        <input type="checkbox" />
      </div>
      <ReactQuill
        modules={modules}
        ref={reactQuillRef}
        style={{ width: "400px", height: "500px" }}
        onChange={(value) => {
          console.log(value);
        }}
      />


      <div>
        지도API
      </div>
    </div>
  );
}

export default LunchWrite;