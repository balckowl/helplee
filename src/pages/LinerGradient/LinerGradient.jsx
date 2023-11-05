import React, { useContext, useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './LinerGradient.scss'
import { AuthContext } from '../../context/AuthContext';
import { auth, db, provider } from '../../../api/firebase';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Prism from "prismjs";
import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
import CommonMeta from '../../components/CommonMeta/CommonMeta';
import { signInWithPopup } from 'firebase/auth';


const LinerGradient = () => {

  const { user } = useContext(AuthContext);

  const [degree, setDegree] = useState(30)
  const [colorFields, setColorFields] = useState([{ color: "#d17aff", endPoint: "20" }, { color: "#7ae4ff", endPoint: "80" }])

  const generateGradientString = () => {
    const baseGradient = `${degree}deg`;
    const colorFieldGradient = colorFields
      .map((field) => `,${field.color} ${field.endPoint}%`)
      .join('');
    console.log(colorFieldGradient)
    console.log(baseGradient + colorFieldGradient)
    return baseGradient + colorFieldGradient;
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [generateGradientString()]);

  const linerGradientStyle = css({
    width: "100%",
    background: `linear-gradient(${generateGradientString()})`,
  })

  const addColorField = () => {
    setColorFields([...colorFields, { color: "#ffffff", endPoint: "50" }])
  }

  const removeColorField = () => {
    const updatedColorFields = [...colorFields]

    updatedColorFields.pop()

    setColorFields(updatedColorFields)
  }

  const updateColorField = (index, field, value) => {
    const updatedColorFields = [...colorFields];
    updatedColorFields[index][field] = value;
    setColorFields(updatedColorFields);
    console.log(updatedColorFields)
  };

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(`linear-gradient(${generateGradientString()})`);
      alert('コピーされました。');
    } catch (error) {
      console.error('コピーに失敗しました。', error);
    }
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  }

  const sendFavLinerGradient = async () => {

    if (user) {
      const { uid, displayName } = user;

      const userDocRef = doc(db, "user", uid);

      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          displayName,
          LinerGradient: [`liner-gradient(${generateGradientString()})`],
        })
      } else {
        await updateDoc(userDocRef, {
          LinerGradient: arrayUnion(`liner-gradient(${generateGradientString()})`),
        })
      }
      alert('登録されました。')
    } else {
      signInWithGoogle()
    }
  }

  return (
    <main>
      <CommonMeta title="helplee | Liner-Gradient" />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-11">
            <div className="box-head p-2 ps-3">
              <h2 className='text-white'>Liner-Gradient</h2>
            </div>
            <div className='bg-white box' css={linerGradientStyle}>
              <div className="row justify-content-center">
                <div className="col-lg-11">
                  <div className="p-2 mb-3">
                    <div className='btn-box d-flex justify-content-between'>
                      <p>sample.css</p>
                      <div className='d-flex gap-3'>
                        <div onClick={copyToClipBoard}><i class="bi bi-clipboard"></i></div>
                        <div onClick={sendFavLinerGradient} className='favbtn'><i class="bi bi-star-fill"></i></div>
                      </div>
                    </div>
                    <div className='css-box p-2'>
                      <pre className="line-numbers">
                        <code className='language-css'>
                          {`liner-gradient(${generateGradientString()})`}
                        </code>
                      </pre>
                    </div>
                  </div>

                  <div className='row justify-content-center g-0 mx-2 liner-box p-2'>
                    <div className="row g-0 justify-content-center gap-3">
                      <div className="col-lg-3 d-flex align-items-center justify-content-center"><h3>角度</h3></div>
                      <div className="col-lg-3 d-flex align-items-center justify-content-center"><p>{degree}deg</p></div>
                      <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={degree} min="-180" max="180" onChange={(e) => setDegree(e.target.value)} /></div>
                    </div>
                  </div>

                  <div className="row g-0 gap-0 mx-2">
                    {colorFields.map((CF, index) => (
                      <div className='my-2 col-lg-3 liner-box p-1' key={index}>
                        <div>
                          <h3>colorField{index + 1}</h3>
                          <div>
                            <div>
                              <h3>カラー</h3>
                              <p>{CF.color}</p>
                              <input type="color" value={CF.color} onChange={(e) => updateColorField(index, 'color', e.target.value)} />
                            </div>

                            <div>
                              <h3>終始位置</h3>
                              <p>{CF.endPoint}%</p>
                              <input type="range" value={CF.endPoint} onChange={(e) => updateColorField(index, 'endPoint', e.target.value)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}


                    <div className='col-lg-1 my-2'>
                      <div>
                        <div onClick={removeColorField} className="delite d-flex align-items-center justify-content-center">
                          <p>ー</p>
                        </div>
                      </div>
                    </div>
                    <div onClick={addColorField} className='col-lg-1 my-2'>
                      <div>
                        <div className="next d-flex align-items-center justify-content-center">
                          <p>＋</p>
                        </div>
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

export default LinerGradient