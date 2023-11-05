import React, { useState } from 'react'
import './QR.scss'
import QRCode from 'qrcode.react'
import CommonMeta from '../../components/CommonMeta/CommonMeta'

const QR = () => {

    const [url, setURL] = useState('https://example.com')
    const [bgColor, setBgColor] = useState("#FFFFFF")
    const [fgColor, setFgColor] = useState("#000000")

    const downloadQR = () => {
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <main>
            <CommonMeta title="helplee | QRCode" />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-11">
                        <div className="box-head p-2 ps-3">
                            <h2 className='text-white'>QRcode-generater</h2>
                        </div>
                        <div className="bg-white box">
                            <div className="row justify-content-center px-1 g-0">
                                <div className="col-lg-11">
                                    <div className="row justify-content-between align-items-center py-lg-4 py-2 mx-lg-5 mx-2">
                                        <div className='col-lg-6 QR-input-box py-3 mb-2 mb-lg-0'>
                                            <div className="text-center">
                                                <div>

                                                    <div className='mb-4'>
                                                        <h3 className='mb-1'>URL</h3>
                                                        <input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
                                                    </div>

                                                    <div className='row g-0 mb-4 justify-content-center gap-0 color-style'>
                                                        <div className="col-6 d-flex align-items-center justify-content-center"><h3>背景色</h3></div>
                                                        <div className="col-6 d-flex align-items-center justify-content-center"><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /></div>
                                                    </div>

                                                    <div className='row g-0 mb-4 justify-content-center gap-0 color-style'>
                                                        <div className="col-6 d-flex align-items-center justify-content-center"><h3>前景色</h3></div>
                                                        <div className="col-6 d-flex align-items-center justify-content-center"><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-lg-5 QR-style-box py-3 d-flex justify-content-center align-items-center'>
                                            <div>
                                                <QRCode
                                                    id="qrcode"
                                                    value={url}
                                                    size={250}
                                                    level={"H"}
                                                    bgColor={bgColor}
                                                    fgColor={fgColor}
                                                    includeMargin={true}
                                                />
                                                <br />
                                                <div className="d-flex justify-content-center align-items-center mt-2">
                                                    <button onClick={downloadQR}> Download QR </button>
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

export default QR