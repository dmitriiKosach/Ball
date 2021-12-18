import React, {useEffect, useRef, useState} from 'react';
import styles from "./Ball.module.css";
import {COLORS} from "../../config/config_ball";

const Ball = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [isAutoColor, setIsAutoColor] = useState(false);
    const [isColor, setIsColor] = useState(false);

    const ball = useRef();
    const ball_bg = useRef();

    const handlerChangeSetColor = (e) => {
        const name = e.target.name;
        ball_bg.current.style.animationPlayState = 'paused';
        setIsAutoColor(false);
        setIsColor(() => true);
        ball_bg.current.style.boxShadow = (COLORS.find(color => color.name === name)).boxShadow;
    }

    const handlerChangeAutoColors = () => {
        setIsColor(false);
        setIsAutoColor(!isAutoColor);
    }

    const handlerChangeRunning = () => {
        setIsRunning(!isRunning);
    }

    useEffect(() => {
        isAutoColor ? ball_bg.current.style.animationPlayState = 'running' : ball_bg.current.style.animationPlayState = 'paused';
    }, [isAutoColor])

    useEffect(() => {
        isRunning ? ball.current.style.animationPlayState = 'running' : ball.current.style.animationPlayState = 'paused';
    }, [isRunning])

    return <React.Fragment>
        <div className={styles.container}>
            <div className={styles.field}>
                <div ref={ball} className={styles.ball}>
                    {!isColor ? <div ref={ball_bg} className={styles.ball_color}/> : <div ref={ball_bg} className={styles.ball_bg}/>}
                </div>
            </div>
            <div className={styles.options}>
                <div>
                    <button type='button' onClick={handlerChangeRunning} className={styles.btn}><span>Bounce</span></button>
                    <button type='button' onClick={handlerChangeAutoColors} className={styles.btn}><span>Fill</span></button>
                </div>
                <div className={styles.options_colors}>
                    {COLORS.map(color => {
                        return <button key={color.name} className={styles.btn_color} style={{boxShadow: color.boxShadow}} type='button' name={color.name} onClick={handlerChangeSetColor}/>
                    })}
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Ball;
