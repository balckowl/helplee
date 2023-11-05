import React, { useContext, useEffect, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import './ImgFilter.scss'
import { AuthContext } from '../../context/AuthContext'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db, provider } from '../../../api/firebase'
import Prism from "prismjs";
import 'prism-themes/themes/prism-vsc-dark-plus.min.css'
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import { signInWithPopup } from 'firebase/auth'

const ImgFilter = () => {

    const [blur, setBlur] = useState(0)
    const [grayScale, setGrayScale] = useState(0)
    const [sepia, setSepia] = useState(0)
    const [brightness, setBrightness] = useState(100)
    const [hueRotate, setHueRotate] = useState(0)
    const [saturate, setSaturate] = useState(100)
    const [opacity, setOpacity] = useState(100)
    const [contrast, setContrast] = useState(100)
    const [invert, setInvert] = useState(0)

    const { user } = useContext(AuthContext);

    const imgFilterString = () => {
        const updateValueFuncs = []

        if (blur > 0) {
            updateValueFuncs.push(`blur(${blur}%)`)
        }

        if (grayScale > 0) {
            updateValueFuncs.push(`grayScale(${grayScale}px)`)
        }

        if (sepia > 0) {
            updateValueFuncs.push(`sepia(${sepia}%)`)
        }

        if (brightness != 100) {
            updateValueFuncs.push(`brightness(${brightness}%)`)
        }

        if (hueRotate > 0) {
            updateValueFuncs.push(`hueRotate(${hueRotate}%)`)
        }

        if (saturate != 100) {
            updateValueFuncs.push(`saturate(${saturate}%)`)
        }

        if (opacity < 100) {
            updateValueFuncs.push(`opacity(${opacity}%)`)
        }

        if (contrast != 100) {
            updateValueFuncs.push(`contrast(${contrast}%)`)
        }

        if (invert > 0) {
            updateValueFuncs.push(`invert(${invert}%)`)
        }

        if (updateValueFuncs.length === 0) {
            return;
        } else {
            return `filter: ${updateValueFuncs.map((func) => func).join(' ')}`
        }

    }

    useEffect(() => {
        Prism.highlightAll();
    }, [imgFilterString()]);

    const imgFilterStyle = css({
        filter: `blur(${blur}px) grayscale(${grayScale}%) sepia(${sepia}) brightness(${brightness}%) hue-rotate(${hueRotate}deg) saturate(${saturate}%) opacity(${opacity}%) contrast(${contrast}%) invert(${invert}%)`,
    })

    const copyToClipBoard = async () => {
        if (!imgFilterString()) {
            alert('パラメータがデフォルトのままです。')
        }

        try {
            await navigator.clipboard.writeText(imgFilterString());
            alert('コピーされました。');
        } catch (error) {
            console.error('コピーに失敗しました。', error);
        }
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
    }

    const sendImgFilter = async () => {
        if (user) {
            const { uid, displayName } = user;

            const userDocRef = doc(db, "user", uid);

            const userDocSnap = await getDoc(userDocRef);

            if (!imgFilterString()) {
                alert('パラメータが変更されていません。')
            }

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    displayName,
                    ImgFilter: [imgFilterString()],
                })
                alert('登録されました。')
            } else {
                if (userDocSnap.data().ImgFilter.length >= 3) {
                    alert("３つ以上は登録できません。")
                } else {
                    await updateDoc(userDocRef, {
                        ImgFilter: arrayUnion(imgFilterString()),
                    })
                    alert('登録されました。')
                }
            }
        } else {
            signInWithGoogle()
        }
    }

    return (
        <main>
            <CommonMeta title='helplee | Img-Filter' />

            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-11">
                        <div className="box-head p-2 ps-3">
                            <h2 className='text-white'>Image-Filter</h2>
                        </div>
                        <div className="bg-white box">
                            <div className="row justify-content-center px-1 g-0">
                                <div className="col-lg-11">
                                    <div className="row justify-content-between align-items-center g-0 py-lg-4 py-2 mx-lg-5 mx-2">
                                        <div className="col-lg-6 img-input-box p-3 order-lg-1 order-2">
                                            <div className="text-center">
                                                <div className='row g-0 mb-3 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>ぼかし</h4></div>
                                                    <div className="col-lg-3"><p>{blur}px</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={blur} onChange={(e) => setBlur(e.target.value)} /></div>
                                                </div>

                                                <div className='row g-0 mb-3 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>グレー</h4></div>
                                                    <div className="col-lg-3"><p>{grayScale}%</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={grayScale} onChange={(e) => setGrayScale(e.target.value)} /></div>
                                                </div>

                                                <div className='row g-0 mb-3 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>セピア</h4></div>
                                                    <div className="col-lg-3"><p>{sepia}%</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={sepia} onChange={(e) => setSepia(e.target.value)} /></div>
                                                </div>

                                                <div className='row g-0 mb-3 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>明るさ</h4></div>
                                                    <div className="col-lg-3"><p>{brightness}%</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={brightness} min="0" max="200" onChange={(e) => setBrightness(e.target.value)} /></div>
                                                </div>

                                                <div className='row g-0 mb-3 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>色相</h4></div>
                                                    <div className="col-lg-3"><p>{hueRotate}°</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={hueRotate} min="0" max="360" onChange={(e) => setHueRotate(e.target.value)} /></div>
                                                </div>

                                                <div className='row g-0 mb-3 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>彩度</h4></div>
                                                    <div className="col-lg-3"><p>{saturate}%</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={saturate} min="0" max="1000" onChange={(e) => setSaturate(e.target.value)} /></div>
                                                </div>

                                                <div className='row g-0 mb-3 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>透明度</h4></div>
                                                    <div className="col-lg-3"><p>{opacity}%</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={opacity} onChange={(e) => setOpacity(e.target.value)} /></div>
                                                </div>

                                                <div className='row g-0 mb-3 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>コントラスト</h4></div>
                                                    <div className="col-lg-3"><p>{contrast}%</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" min="0" max="1000" value={contrast} onChange={(e) => setContrast(e.target.value)} /></div>
                                                </div>

                                                <div className='row g-0 justify-content-center gap-3'>
                                                    <div className="col-lg-3"><h4>反転</h4></div>
                                                    <div className="col-lg-3"><p>{invert}%</p></div>
                                                    <div className="col-lg-4 d-flex align-items-center justify-content-center"><input type="range" value={invert} onChange={(e) => setInvert(e.target.value)} /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 order-lg-2 order-1 mb-2 mb-lg-0">
                                            <div className='d-flex justify-content-center'>
                                                <div className="img-style-box p-4">
                                                    <img src="https://picsum.photos/800/800" alt="" css={imgFilterStyle} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2 mb-3">
                                        <div className='btn-box d-flex justify-content-between'>
                                            <p>sample.css</p>
                                            <div className='d-flex gap-3'>
                                                <div onClick={copyToClipBoard}><i class="bi bi-clipboard"></i></div>
                                                <div onClick={sendImgFilter} className='favbtn'><i class="bi bi-star-fill"></i></div>
                                            </div>
                                        </div>
                                        <div className='css-box p-2'>
                                            <pre className="line-numbers">
                                                <code className='language-css'>
                                                    {imgFilterString()}
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
        </main>
    )
}

export default ImgFilter