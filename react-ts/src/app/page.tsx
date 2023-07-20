import { Link } from "../components/Link";
import { useState, useEffect, createContext, useContext } from "react";
import { Diary } from '../interface/diary';
import { useDiaryValue, useDiaryUpdate } from "../provider/Diary";

export const DIARY_STORAGE_KEY = 'diary-storage' as const

const emotionEmoji: Record<Diary['emotion'], string> = {
    awesome: '😎',
    great: '😃',
    good: '😙',
    soso: '😗',
    bad: '🤬',
}

const weatherEmoji: Record<Diary['weather'], string> = {
    sunny: '☀️',
    cloud: '☁️',
    rain: '🌧',
    snow: '❄️',
}

const DiaryWriter = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [emotion, setEmotion] = useState<Diary['emotion']|undefined>();
    const [weather, setWeather] = useState<Diary['weather']|undefined>();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isNotValidDiary =
            emotion === undefined || weather === undefined || title.length <= 2 || content.length <= 5
        setIsValid(!isNotValidDiary)
    }, [title, content, emotion, weather])

    const setDairy = useDiaryUpdate()
    
    const saveDiary = () => {
        if(isValid === false) return
        
        const newDiary = {
            id: window.crypto.randomUUID(),
            title: title,
            content: content,
            date: new Date(),
            emotion: emotion!,
            weather: weather!,
            views: 1,
        }

        
        setDairy((prev) => {
            const updatedDiary = [...prev, newDiary]
            window.localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(updatedDiary))
            return updatedDiary
        })
        
        resetDiary()
    }

    const resetDiary = () => {
        setTitle('')
        setContent('')
        setEmotion(undefined)
        setWeather(undefined)
    }

    const color = isValid ? "emerald" : "gray"
    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-white p-2.5 border border-gray-100 w-full h-2/3 min-h-[20rem]">
                <input type="text" className="p-2 my-3 w-full text-gray-900 rounded-md ring-gray-100 focus:outline-none focus:ring-1 text-2xl" id="title" value={title} placeholder="제목을 적어보세요" onChange={(event)=> {
                    setTitle(event.target.value)
                }}/>
                <div>
                    <div className="flex flex-row">
                        <button onClick={()=>setEmotion("bad")} className={emotion === "bad" ? "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-emerald-500 bg-emerald-200 focus:outline-none bg-emerald rounded-lg border active:translate-y-[1px] hover:border-emerald-500 hover:text-emerald-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 "}>bad</button>
                        <button onClick={()=>setEmotion("soso")} className={emotion === "soso" ? "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-emerald-500 bg-emerald-200 focus:outline-none bg-emerald rounded-lg border active:translate-y-[1px] hover:border-emerald-500 hover:text-emerald-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 "}>soso</button>
                        <button onClick={()=>setEmotion("good")} className={emotion === "good" ? "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-emerald-500 bg-emerald-200 focus:outline-none bg-emerald rounded-lg border active:translate-y-[1px] hover:border-emerald-500 hover:text-emerald-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 "}>good</button>
                        <button onClick={()=>setEmotion("great")} className={emotion === "great" ? "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-emerald-500 bg-emerald-200 focus:outline-none bg-emerald rounded-lg border active:translate-y-[1px] hover:border-emerald-500 hover:text-emerald-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 "}>great</button>
                        <button onClick={()=>setEmotion("awesome")} className={emotion === "awesome" ? "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-emerald-500 bg-emerald-200 focus:outline-none bg-emerald rounded-lg border active:translate-y-[1px] hover:border-emerald-500 hover:text-emerald-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-2 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 "}>awesome</button>
                    </div>
                    <div className="flex flex-row">
                        <button onClick={()=>setWeather("cloud")} className={weather === "cloud" ? "flex items-center justify-center py-1.5 px-3 mr-3 mb-3 text-sm font-medium text-blue-500 bg-blue-200 focus:outline-none rounded-lg border active:translate-y-[1px] hover:border-blue-500 hover:text-blue-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-3 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900"}>cloud</button>
                        <button onClick={()=>setWeather("rain")} className={weather === "rain" ? "flex items-center justify-center py-1.5 px-3 mr-3 mb-3 text-sm font-medium text-blue-500 bg-blue-200 focus:outline-none rounded-lg border active:translate-y-[1px] hover:border-blue-500 hover:text-blue-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-3 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900"}>rain</button>
                        <button onClick={()=>setWeather("snow")} className={weather === "snow" ? "flex items-center justify-center py-1.5 px-3 mr-3 mb-3 text-sm font-medium text-blue-500 bg-blue-200 focus:outline-none rounded-lg border active:translate-y-[1px] hover:border-blue-500 hover:text-blue-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-3 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900 "}>snow</button>
                        <button onClick={()=>setWeather("sunny")} className={weather === "sunny" ? "flex items-center justify-center py-1.5 px-3 mr-3 mb-3 text-sm font-medium text-blue-500 bg-blue-200 focus:outline-none rounded-lg border active:translate-y-[1px] hover:border-blue-500 hover:text-blue-500" 
                        : "flex items-center justify-center py-1.5 px-3 mr-3 mb-3 text-sm font-medium text-gray-500 bg-gray-200 focus:outline-none bg-white rounded-lg border active:translate-y-[1px] hover:border-gray-900 hover:text-gray-900"}>sunny</button>
                    </div>
                </div>
                <textarea id="content" rows={4} value={content} onChange={(event)=>{
                    setContent(event.target.value)
                }} className="p-1.5 text-m text-gray-900 rounded-lg ring-gray-300 focus:outline-none focus:ring-1 resize-none" placeholder="오늘 당신의 하루는 어땠나요?"></textarea>
                <button className={`p-1 border border-gray-100 rounded-lg bg-${color}-100 text-${color}-500 hover:border-gray-700 active:translate-y-[1px]`} onClick={saveDiary} disabled= {!isValid}>{isValid ? '일기를 저장해보아요' :'일기를 더 자세히 적어볼까요?'}</button>                
                
            </div>
    )
}

const DiaryViewer = ({ diary }: {diary: Diary[]}) => {
    

    const isDiaryExist = diary.length > 0
    return (
        <>
            {isDiaryExist ? (
                <div className="flex flex-col">
                    {diary.map((props) => {
                        const parsedDate = typeof props.date === 'string' ? new Date(props.date) : props.date

                        const formattedDate = Intl.DateTimeFormat('ko-KR',
                            {dateStyle: 'medium'}
                        ).format(parsedDate)

                        return <Link to={`/detail/${props.id}`} key={props.id} className="flex flex-col border border-gray-100 my-1 rounded-l p-3 hover:bg-gray-50"> 
                            <h1> {props.title} </h1>
                            <div className="flex flex-row items-center justify-between gap-1 w-full">
                                <span className="text-gray-500"> {formattedDate} </span>
                                <div className="flex flex-row gap-1s">
                                    <div className="flex w-6 h-6 p-1 items-center justify-center rounded-full border border-100">{emotionEmoji[props.emotion]}</div>
                                    <div className="flex w-6 h-6 p-1 items-center justify-center rounded-full border border-100">{weatherEmoji[props.weather]}</div>
                                </div>
                               
                            </div>
                        </Link>
                    })}
                </div>
            ) : <div> 일기를 적어보세요 </div>} 
        </>
    )
}



export default function DiaryHomePage() {
    // const diary = useDiaryValue()
    const diary: Diary[] = [];
    for (let i = 0; i < window.localStorage.length; i++)
    {
        const key = window.localStorage.key(i);
        if (key)
        {
            const value = window.localStorage.getItem(key);
            if (value)
            {
                diary.push(JSON.parse(value));
            }
        }
        
    }



    return (
        <div className="min-h-screen max-h-screen h-screen w-full bg-white flex item-center justify-center">
            <div className="flex flex-col items-center justify-center gap-10 h-full md:grid md:grid-rows-1 md:grid-cols-[3fr,2fr] md:w-4/5 lg:w-2/3">
                <DiaryWriter />
                <div className="w-full flex flex-col items-start gap-4 p-4 justify-between rounded-lg bg-white border border-gray-100 h-2/3 min-h-[20rem]">
                    <h1 className="text-xl text-emerald-600 mt-5">기록된 일기</h1>
                    <div className="flex flex-col overflow-y-auto gap-2 w-full max-h-96">
                        {/* <DiaryViewer diary={useDiaryValue()} />   */}
                        <DiaryViewer diary={useDiaryValue()} /> 
                    </div>
                    <Link to="/emotions" className="flex w-full py-3 flex items-center justify-center rounded-lg border border-emerald-200 text-emerald-600 bg-emerald-200 hover:border-emerald-600 active:translate-y-[1px]"> 감정 모아보기 </Link>
                </div>
            </div>
        </div>
        
    )
}
