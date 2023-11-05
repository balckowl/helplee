import React from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main>
      <div className="container">
        <div className="row gy-5 py-3">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link to="/linergradient">
                  <h3 className="card-title">Liner-Gradient</h3>
                  <div className="card-icon text-center">
                    <img src="/images/Liner-Gradient-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link to="/boxshadow">
                  <h3 className="card-title">Box-Shadow</h3>
                  <div className="card-icon text-center">
                    <img src="/images/Box-Shadow-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link to="/textshadow">
                  <h3 className="card-title">Text-Shadow</h3>
                  <div className="card-icon text-center">
                    <img src="/images/Text-Shadow-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className="card">
              <div className="card-body">
                <Link to="/imgfilter">
                  <h3 className="card-title">Image-Filter</h3>
                  <div className="card-icon text-center">
                    <img src="/images/Img-Filter-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link to="/qrcode">
                  <h3 className="card-title">QRcode-Generater</h3>
                  <div className="card-icon text-center">
                    <img src="/images/QRCode-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home