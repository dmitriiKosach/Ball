import React, {useEffect, useState} from "react";
import styles from './StringAndCalls.module.css';
import {BASE_URL} from "../../config/config_api";

const StringAndCalls = () => {
    const [todos, setTodos] = useState([]);

    function compare(a, b){
        if ( a.title < b.title ){
            return -1;
        }
        if ( a.title > b.title ){
            return 1;
        }
        return 0;
    }

    const todosFilter = todos.filter(todo => todo.title.substring(0,1).toLowerCase() === 's').sort(compare);

    const todoItem = todosFilter.map((todo) => {
        return todo.title.substr(todo.title.length-1, 1) === 'e'
            ? <li className={styles.title} key={todo.id}><p style={{backgroundColor: 'aquamarine', fontWeight: '500'}}>{todo.title}</p></li>
            : <li className={styles.title} key={todo.id}><p>{todo.title}</p></li>;
    })

    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', BASE_URL, true);
        xhr.send();

        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) {
                return false;
            }
            if(xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            }else{
                setTodos(JSON.parse(xhr.responseText))
            }
        }
    },[]);

    return <React.Fragment>
        <div className={styles.container}>
            <ul>
                {todoItem}
            </ul>
        </div>
    </React.Fragment>
}

export default StringAndCalls;
