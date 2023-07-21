import React, { useEffect, useState } from 'react';
import './Test.css'

Test.propTypes = {

};

function Test(props) {
    // useEffect : nó là một cái hook của react, để xử lý side Effect
    // side Effect: gọi Api , xử lý Dom, setInterval, setTimeOut, sur
    // side Effect: gồm có hai loại (loại cần Clearn up, loại không cần clearn up)
    // cần clearn Up: setInterval, setTimeout tại vì khi mình set những cái này không set được 2 lần vào window thông thương nó sẽ chạy bị lặp lại
    // không cần clearn up: gọi Api , xử Dom
    // Trong useEffect gồm có 3 loại: không có depencies , có depencies nhưng empty, và có depencies có biến truyền vào

    // Loại 1: useEffect không có depencies (được gọi lại khi component re-render)
    //      + bước 1: render component trước
    //      + bước 2: chạy callback useEffect
    //      + bước 3: nếu component re-render
    //      + bước 4 : render trước, sau đó kiểm tra có clearn up hay không nếu có sẽ chạy clearn up trước khi gọi callback.
    const [input, setInput] = useState("") // state thay đổi thì component sẽ re-render (là chạy lại function component)
    const [listData, setListData] = useState()
    const [type, setType] = useState("posts")

    /*useEffect(() => {
        console.log("side effect đang được gọi");
        async function fectApi(params) {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts')
            let data = await response.json()
            console.log(data);
        }
        fectApi()
        return () => {// optional: có thể có hoặc không tuỳ vào side Effect
            // function clearn up (function dọn dẹp) : hàm này sẽ không được chạy lần đầu tiên component render
            console.log("xoá side effect");
        }
    })*/

    // Loại 2: useEffect có depencies nhưng empty (là rỗng)
    //      + bước 1: render component trước
    //      + bước 2: chạy callback useEffect
    // tuy nhiên : chỉ chạy một lần duy nhất khi component render lần đầu tiên

    // useEffect(() => {
    //     async function fectApi() {
    //         let response = await fetch('https://jsonplaceholder.typicode.com/posts')
    //         let data = await response.json()
    //         setListData(data)
    //     }
    //     fectApi()
    // }, [])

    // loại 3: useEffect có depencies và có biến truyền vào
    //      + bước 1: render component trước
    //      + bước 2: chạy callback useEffect
    //      + tuy nhiên khi biến depencies thay đổi thì useffect sẽ được gọi lại.

    const arrayEndpoint = ["posts", "comments", "albums"]

    useEffect(() => {
        console.log("api duoc goi");
        async function fectApi() {
            let response = await fetch(`https://jsonplaceholder.typicode.com/${type}`)
            let data = await response.json()
            setListData(data)
        }
        fectApi()

        return () => {
            // kể từ lần thứ 2 trở đi thì clearn up luôn được gọi trước callback
        }
    }, [type])


    const handleOnchange = (e) => {
        setInput(e.target.value)
    }

    const handleOnclick = (item) => {
        setType(item)
    }

    return (
        <div className='wrap-name'>
            {console.log("component render")}
            <input type="text" value={input} onChange={(e) => handleOnchange(e)} />
            <h1>Wellcome to Use Effect</h1>
            {arrayEndpoint && arrayEndpoint.map(item => {
                return <button onClick={() => handleOnclick(item)}>{item}</button>
            })}
            <ul>
                {listData && listData.map(item => {
                    return <li>{item.title || item.name}</li>
                })}
            </ul>

        </div>
    );
}

export default Test;