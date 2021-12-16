/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { getAllData } from '../Service/Service'
import Chart from "./Chart";


const Fetch = () => {
    //for getting data from API

    const getAllDataFromAPI = async () => {
        return getAllData();
    }

    //useStates
    const [AllData, setAllData] = useState(null);

    ///-------------- Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [itemPerPage, setItemPerPage] = useState(5);


    // eslint-disable-next-line no-unused-vars
    const [PageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);

    const pages = [];
    for (let i = 1; i <= (Math.ceil(AllData ? AllData.length + 5 : 5)) / itemPerPage; i++)
        pages.push(i);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const currentItem = AllData ? AllData.slice(indexOfFirstItem, indexOfLastItem).sort((a,b)=>a.TotalConfirmed-b.TotalConfirmed) : [];

    const renderPageNumber = pages.map((number)=>{

        if (number < maxPageLimit + 1 && number > minPageLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    // eslint-disable-next-line eqeqeq
                    className={`page-item   ${currentPage == number ? 'active' : ''}`}
                    onClick={
                        (e) => handlePagination(e)
                    }
                >
                    <span className="page-link"  key={number}
                    id={number}>
                        {number}
                    </span>
                </li>
            )
        }
    })

    const renderData = (currentItem) => {
        let Country = [];
        let TotalConfirmed = [];
        let TotalDeaths = [];
        let TotalRecovered = [];

        currentItem.map(oneObj => {
            Country.push(oneObj.Country);
            TotalConfirmed.push(oneObj.TotalConfirmed);
            TotalDeaths.push(oneObj.TotalDeaths);
            TotalRecovered.push(oneObj.TotalRecovered);
        })
        let obj={ Country, TotalConfirmed, TotalDeaths, TotalRecovered }
        // console.log(obj);
        return <Chart obj={obj}/>
    }

    const handlePagination = (e) => {
        setCurrentPage(Number(e.target.id))
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1)%PageNumberLimit===0) {
            setMaxPageLimit(maxPageLimit-PageNumberLimit);
            setMinPageLimit(minPageLimit-PageNumberLimit);
        }
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit+PageNumberLimit);
            setMinPageLimit(minPageLimit+PageNumberLimit);
        }
    }
    ///-------------- /Pagination Logic

    useEffect(() => {
        const get = async () => {
            const data = await getAllDataFromAPI();
            setAllData(data.Countries)
        }
        get();
    }, [])

    useEffect(() => {
        if (currentItem.length>0)
        {
            let Country = [];
            let TotalConfirmed = [];
            let TotalDeaths = [];
            let TotalRecovered = [];

            currentItem.map(oneObj => {
                Country.push(oneObj.Country);
                TotalConfirmed.push(oneObj.TotalConfirmed);
                TotalDeaths.push(oneObj.TotalDeaths);
                TotalRecovered.push(oneObj.TotalRecovered);
            });
            let obj = { Country, TotalConfirmed, TotalDeaths, TotalRecovered };
            <Chart obj={obj}/>
        }
    },[currentItem])

    

    return (
        <div className="container">
            <h1><strong className="text-secondary">COVID-19 STATISTICS</strong></h1>
                {renderData(currentItem)}
            <hr/>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li
                        className={`page-item ${currentPage === pages[0]?'disabled':''}`}                      >
                        <button className="page-link"
                            disabled={currentPage === pages[0]?true:false}
                            onClick={handlePrev}
                        >
                            Previous
                        </button>
                    </li >
                    {
                        renderPageNumber
                    }
                    <li className={`page-item ${currentPage === pages.length ? 'disabled' : ''}`} 
                    >
                        <button className="page-link"
                            disabled={Number(currentPage - 1) === Number(pages[pages.length]) ? true : false}
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav >
            <hr/>
        </div>
    )

}

export default Fetch




    // < li className="page-item" > <a className="page-link" href="#">1</a></ >
            
    //         <li className="page-item"><a className="page-link" href="#">3</a></li>

