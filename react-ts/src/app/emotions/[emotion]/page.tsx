import { useParams } from 'react-router-dom'
import { Diary } from '../../../interface/diary'
import { EMOTION_DATA, EMOTION_LIST } from '../../../constatnts'
import { useDiaryValue } from '../../../provider/Diary'
import { useState } from 'react'
import { Link } from '../../../components/Link'

type EmotionPageParams = {
    emotion: Diary['emotion']
}

const DiaryTable = (diary: Diary) => {
    const {id, date, title, views} = diary
    return (
        <div>
            <input type="checkbox">

            </input>
            <Link to ={`/detail/${id}`}>
                <div>{title}</div>
                <div>
                    {/* <div>{date}</div> */}
                    <div>조회수: {views} </div>
                </div>
            </Link>

        </div>
    )
}


export default function EmotionPage() {
    const { emotion } = useParams<EmotionPageParams>()
    if (emotion === undefined) throw Error("undefined")

    const emotionDiary = useDiaryValue().filter((diary) => diary.emotion === emotion)
    const isEmotionDiaryExists = emotionDiary.length > 0
    const [removeSelected, setRemoveSelected] = useState<string[]>([])
    const isRemoveSelected = removeSelected.length > 0

    const removeSelectDiary = () => {
        removeSelected.forEach((id) => window.localStorage.removeItem(id))
    }
    

    return (
        <div>
            <div>
                <h1> {EMOTION_DATA[emotion].description} </h1>
            </div>
            {
                isEmotionDiaryExists ? (
                    <>
                    {emotionDiary.map((diary) => (
                    //   <DiaryTable diary={diary}/>  
                        <Link to={`/detail/${diary.id}`}  className="flex flex-row" key={diary.id}>{diary.title}</Link>
                    )
                    )} 
                    <button disabled={!isRemoveSelected} onClick={removeSelectDiary}>
                        {isRemoveSelected ? `선택된 ${removeSelected.length}개의 일기를 삭제 합니다`
                        : '선택된 일기가 없습니다'}
                    </button>
                    </>
                ) :
                (
                    <div> 아직 적지 않았어요! </div>
                )
            }
        </div>
    )
}
