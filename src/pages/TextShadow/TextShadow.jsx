import React, { useContext, useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './TextShadow.scss'
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../../api/firebase';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Prism from 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
import CommonMeta from '../../components/CommonMeta/CommonMeta';

const TextShadow = () => {

  const { user } = useContext(AuthContext);

  const [shadowX, setShadowX] = useState(0)
  const [shadowY, setShadowY] = useState(0)
  const [color, setColor] = useState("#000000")
  const [blur, setBlur] = useState(0)
  const textShadowCode = `${shadowX}px ${shadowY}px ${blur}px ${color}`

  const textShadowStyle = css({
    textShadow: textShadowCode
  })

  useEffect(() => {
    Prism.highlightAll();
  }, [textShadowCode]);

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(textShadowCode);
      alert('コピーされました。');
    } catch (error) {
      console.error('コピーに失敗しました。', error);
    }
  }

  const sendFavTextShadow = async () => {
    const { uid, displayName } = user;

    const userDocRef = doc(db, "user", uid);

    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        displayName,
        TextShadow: [`text-shadow: ${textShadowCode}`],
      })
    } else {
      await updateDoc(userDocRef, {
        TextShadow: arrayUnion(`text-shadow: ${textShadowCode}`),
      })
    }

    alert('登録されました。')
  }

  return (
    <main>
      <CommonMeta title="helplee | Text-Shadow" />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-11">
            <div className="box-head p-2 ps-3">
              <h2 className='text-white'>Text-Shadow</h2>
            </div>
            <div className='bg-white box'>
              <div className="row justify-content-center px-1 g-0">
                <div className="col-lg-11">
                  <div>
                    <div className="row justify-content-between align-items-center py-lg-4 py-2 mx-lg-5 mx-2">
                      <div className='col-lg-7 order-lg-1 order-2 input-box py-3'>
                        <div className="text-center">
                          <div>
                            <div className='row g-0 mb-4'>
                              <div className="col-lg-4"><h3>左右の位置</h3></div>
                              <div className="col-lg-4"><p>{shadowX}px</p></div>
                              <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" max={50} value={shadowX} onChange={(e) => setShadowX(e.target.value)} /></div>
                            </div>

                            <div className='row g-0 mb-4'>
                              <div className="col-lg-4"><h3>縦横の位置</h3></div>
                              <div className="col-lg-4"><p>{shadowY}px</p></div>
                              <div className="col-lg-4 d-flex align-items-center justify-content-center">
                                <input type="range" max={50} value={shadowY} onChange={(e) => setShadowY(e.target.value)} />
                              </div>
                            </div>

                            <div className='row g-0 mb-3'>
                              <div className="col-lg-4"><h3>ぼかし</h3></div>
                              <div className="col-lg-4"><p>{blur}px</p></div>
                              <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={blur} onChange={(e) => setBlur(e.target.value)} /></div>
                            </div>

                            <div className='row g-0 align-items-center'>
                              <div className="col-lg-4"><h3>カラー</h3></div>
                              <div className="col-lg-4"><p>{color}</p></div>
                              <div className="col-lg-4 color-box d-flex align-items-center justify-content-center"><input type="color" value={color} onChange={(e) => setColor(e.target.value)}></input></div>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className='col-lg-4 order-lg-2 order-1 mb-2 mb-lg-0 p-0'>
                        <div className="d-flex justify-content-center style-box">
                          <div className='text' css={textShadowStyle}>
                            <div className='d-flex justify-content-center align-items-center'>text</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 mb-3">
                      <div className='btn-box d-flex justify-content-between'>
                        <p>sample.css</p>
                        <div className='d-flex gap-3'>
                          <div onClick={copyToClipBoard}><i class="bi bi-clipboard"></i></div>
                          <div onClick={sendFavTextShadow} className='favbtn'><i class="bi bi-star-fill"></i></div>
                        </div>
                      </div>
                      <div className='css-box p-2'>
                        <pre className="line-numbers">
                          <code className='language-css'>
                            {`box-shadow: ${textShadowCode}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TextShadow