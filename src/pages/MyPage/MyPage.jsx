import React, { useContext, useEffect, useReducer, useState } from 'react'
import './MyPage.scss'
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../../api/firebase';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import Prism from 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.min.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css'
import 'prism-themes/themes/prism-vsc-dark-plus.min.css'

const MyPage = () => {

  const [judge, setJudge] = useState();
  const { user } = useContext(AuthContext);
  const [cssData, setCssData] = useState(null);

  const getFavCSS = async () => {
    const { uid } = user

    const docRef = doc(db, "user", uid);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // ドキュメントが存在する場合
        const data = docSnap.data();
        setCssData(data)

      } else {
        // ドキュメントが存在しない場合
        console.log("ドキュメントが存在しません。");
      }
    } catch (error) {
      console.error("ドキュメントの取得中にエラーが発生しました:", error);
    }
  }

  const DeleteFavData = async (cssToDelete) => {
    const { uid } = user;
    const docRef = doc(db, "user", uid);

    try {
      // Firestoreの配列から要素を削除する

      if (judge == 1) {
        await updateDoc(docRef, {
          LinerGradient: arrayRemove(cssToDelete),
        });
      }

      if (judge == 2) {
        await updateDoc(docRef, {
          BoxShadow: arrayRemove(cssToDelete),
        });
      }

      if (judge == 3) {
        await updateDoc(docRef, {
          TextShadow: arrayRemove(cssToDelete),
        });
      }

      if(judge == 4){
        await updateDoc(docRef, {
          ImgFilter: arrayRemove(cssToDelete),
        });
      }
      // 再度データを取得して表示を更新
      getFavCSS();
    } catch (error) {
      console.error("要素の削除中にエラーが発生しました:", error);
    }
  }

  useEffect(() => {
    Prism.highlightAll();
  }, [judge]);

  useEffect(() => {
    if (user) {
      getFavCSS()
    }
  }, [user])


  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="box-head p-2 ps-3">
              <h2 className='text-white'>My Page</h2>
            </div>
            {user ? (<div className="row g-0">
              <div className="col-lg-3 bg-white">
                <div className="text-center">
                  <div className="my-ac my-4">
                    {user &&
                      <>
                        <img src={user.photoURL} alt="" />
                        <h3 className='mt-2'>{user.displayName}</h3>
                      </>
                    }
                  </div>
                  <div className='row g-0 justify-content-center'>
                    <div className="col-11">
                      <div className="select-box mb-3" onClick={() => setJudge(1)}>
                        <p className='p-2'>liner-gradient</p>
                      </div>
                      <div className="select-box my-3" onClick={() => setJudge(2)}>
                        <p className='p-2'>box-shadow</p>
                      </div>
                      <div className="select-box my-3" onClick={() => setJudge(3)}>
                        <p className='p-2'>text-shadow</p>
                      </div>
                      <div className="select-box my-3" onClick={() => setJudge(4)}>
                        <p className='p-2'>img-filter-generater</p>
                      </div>
                      {/* <div className="select-box my-3" onClick={() => setJudge(5)}>
                        <p className='p-2'>QRcode-generater</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 code-box">
                {judge == 1 ? (<>
                  <h2 className='heading'>liner-gradient</h2>
                  <div className="row justify-content-center">
                    <div className="col-11">
                      {cssData && cssData.LinerGradient.map((css, index) => (
                        <div key={index}>
                          <pre>
                            <code className='language-css'>
                              {css}
                            </code>
                          </pre>
                          <button onClick={() => DeleteFavData(css)}>削除</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
                ) : (<></>)}
                {judge == 2 ? (<>
                  <h2 className='heading'>box-shadow</h2>
                  <div className="row justify-content-center">
                    <div className="col-11">
                      {cssData && cssData.BoxShadow.map((css, index) => (
                        <div key={index}>
                          <pre>
                            <code className='language-css'>
                              {css}
                            </code>
                          </pre>
                          <button onClick={() => DeleteFavData(css)}>削除</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
                ) : (<></>)}
                {judge == 3 ? (<>
                  <h2 className='heading'>text-shadow</h2>
                  <div className="row justify-content-center">
                    <div className="col-11">
                      {cssData && cssData.TextShadow.map((css, index) => (
                        <div key={index}>
                          <pre>
                            <code className='language-css'>
                              {css}
                            </code>
                          </pre>
                          <button onClick={() => DeleteFavData(css)}>削除</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
                ) : (<></>)}
                {judge == 4 ? (<>
                  <h2 className='heading'>img-filter-generater</h2>
                  <div className="row justify-content-center">
                    <div className="col-11">
                      {cssData && cssData.ImgFilter.map((css, index) => (
                        <div key={index}>
                          <pre>
                            <code className='language-css'>
                              {css}
                            </code>
                          </pre>
                          <button onClick={() => DeleteFavData(css)}>削除</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
                ) : (<></>)}
                {/* {judge == 5 ? (<>
                  <h2 className='heading'>QRcode-generater</h2>
                  <div className="row justify-content-center">
                    <div className="col-11">
                      <div className="save-box p-2 my-3">
                        code
                      </div>
                      <div className="save-box p-2 my-3">
                        code
                      </div>
                      <div className="save-box p-2 my-3">
                        code
                      </div>
                      <div className="save-box p-2 my-3">
                        code
                      </div>
                      <div className="save-box p-2 my-3">
                        code
                      </div>
                    </div>
                  </div>
                </>
                ) : (<></>)}*/}
              </div>
            </div>) : (
              <div className='bg-white non-userscreen d-flex justify-content-center align-items-center'>
                <h2>Userがいません。</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MyPage