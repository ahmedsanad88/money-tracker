//jshint esversion:6

import React, { useEffect, useState } from 'react';
import Percentage from "./dashboard/Percentage";
import Balance from "./dashboard/Balance";
import ChartShow from "./dashboard/ChartShow";
import DailySpend from "./dashboard/DailySpend";
import { useDispatch, useSelector } from 'react-redux';
import db from './firebase';
import { login } from "../features/userSlice";
import "./Data.css";
import Aos from "aos";
import "aos/dist/aos.css";



function Data() {

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    
    const [total, setTotal] = useState([]);


    let subTotalEarn = 0;
    let subTotalSpend = 0;

    useEffect(() => {
        if (user.id) {
            const unsubscribe = 
            db.collection('users').doc(user.id).collection('dailyMonitor').orderBy('day','desc').onSnapshot((snapshot) => {
                setTotal(snapshot.docs.map((doc) => ({
                day: doc.data().day,
                month: doc.data().month,
                dailyEarn: doc.data().dailyEarn,
                dailySpend: doc.data().dailySpend,
            })));
            
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
        return () => unsubscribe();
        } else {
            console.log("There is no user Found");
        }
    }, [user.id]);

    useEffect(() => {
            setTotalMoney();
    }, [total]);

    const setTotalMoney = () => {
        if (total.length > 0) {
            for (let i = 0; i < total.length; i++) {
                subTotalEarn += parseInt(total[i].dailyEarn);
                subTotalSpend += parseInt(total[i].dailySpend);
            }
            dispatch(login({
                id: user.id,
                email: user.email,
                photo: null,
                fullname: null,
                mobile: null,
                gender: null,
                country: null,
                totalEarn: subTotalEarn,
                totalSpend: subTotalSpend
            })
            );
        }
    };
    // console.log(total);
    // console.log(user);
    
    // Contorl AOS animation..
    useEffect(() => {
        // initailize Aos
        Aos.init({
            duration: 2000
        });
        // make sure it's applying only one
        Aos.init({
            once: true,
            disable: 'phone'
        });
    }, []);


    return (
        <div className="data">
            <div className="data__main">
                <div className="data__header">
                    <h2>Dashboard</h2>
                </div>
                <div data-aos="fade-down" className="row1">
                    <Balance />
                </div>
                <div data-aos="fade-right" className="row2">
                    <Percentage />
                </div>
                <div data-aos="fade-left" className="row3">
                    <ChartShow total={total}/>
                </div>
                <div data-aos="fade-up" className="row4">
                    <DailySpend total={total}/>
                </div>
            </div>
        </div>
    )
}

export default Data;
