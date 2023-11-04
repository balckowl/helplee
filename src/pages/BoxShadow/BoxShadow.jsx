import React, { useContext, useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './BoxShadow.scss'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { AuthContext } from '../../context/AuthContext';

const BoxShadow = () => {

  const { user } = useContext(AuthContext);

  const [shadowX, setShadowX] = useState(0)
  const [shadowY, setShadowY] = useState(0)
  const [blur, setBlur] = useState(0)
  const [color, setColor] = useState('#000000')
  const boxShadowCode = `${shadowX}px ${shadowY}px ${blur}px ${color}`

  const boxShadowStyle = css({
    width: "170px",
    height: "170px",
    border: "1px solid black",
    backgroundColor: "white",
    boxShadow: boxShadowCode,
  });

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(boxShadowCode);
      alert('コピーされました。');
    } catch (error) {
      console.error('コピーに失敗しました。', error);
    }
  }

  const sendFavBoxShadow = async () => {
    const { uid, displayName } = user;

    const userDocRef = doc(db, "user", uid);

    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        displayName,
        boxShadowCode,
      })
    } else {
      await updateDoc(userDocRef, {
        boxShadowCode,
      })
    }

    alert('登録されました。')
  }

  return (
    <main>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-11">
            <div className="box-head p-2 ps-3">
              <h2 className='text-white'>box-shadow</h2>
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
                              <div className="col-lg-4"><h3>横の影</h3></div>
                              <div className="col-lg-4"><p>{shadowX}px</p></div>
                              <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" max={50} value={shadowX} onChange={(e) => setShadowX(e.target.value)} /></div>
                            </div>

                            <div className='row g-0 mb-4'>
                              <div className="col-lg-4"><h3>縦の影</h3></div>
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
                          <div css={boxShadowStyle}></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 mb-3">
                      <div className='btn-box d-flex justify-content-between p-1 pt-2'>
                        <p className='ms-2'>sample.css</p>
                        <div className='d-flex'>
                          <button className='mx-1' onClick={copyToClipBoard}>copy</button>
                          <button onClick={sendFavBoxShadow}>お気に入り</button>
                        </div>
                      </div>
                      <div className='css-box p-2'>
                        <pre className="line-numbers">
                          <code className='language-css'>
                            {`box-shadow: ${boxShadowCode}`}
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

export default BoxShadow