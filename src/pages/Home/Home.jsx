import React from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <main>
      <Helmet
        title={'helplee'}
        meta={[
          { name: 'description', content: 'webサイトを作る際にアシストしてくれるようなサイトを作りました。' },
          { property: 'og:title', content: 'helplee' },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: 'https://helplee.vercel.app/'},
          { property: 'og:image', content: 'https://helplee.vercel.app/helplee.png' },
          { property: 'og:description', content: 'webサイトを作る際にアシストしてくれるようなサイトを作りました。'},
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:image', content: 'https://helplee.vercel.app/helplee.png' },
        ]}
      />

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