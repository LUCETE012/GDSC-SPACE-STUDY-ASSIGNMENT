import { useParams } from 'react-router-dom'
import { Diary } from '../../../interface/diary'
import { useDiaryValue } from '../../../provider/Diary'
import { Link } from '../../../components/Link'

type DiaryDetailPageParams = {
    id: string
}

export default function DiaryDetailPage() {
    const { id } = useParams<DiaryDetailPageParams>()

    const diary: Diary | undefined = useDiaryValue().find((diary) => diary.id === id)

    if(diary === undefined) throw Error("No Diary!")

    const parsedDate = typeof diary.date === 'string' ? new Date(diary.date) : diary.date

    const formattedDate = Intl.DateTimeFormat('ko-KR',
        {dateStyle: 'full'}
    ).format(parsedDate)

    return (
        <div className="flex item-center justify-center min-h-screen max-h-screen h-screen w-full bg-white ">
            <div className="w-2/4 h-full py-20">
                <h1 className="flex item-start justfiy-center text-3xl font-bold">{diary.title}</h1>
                <div className="flex flex-row item-center justify-between gap-2 my-9">
                    <div className="flex item-center justify-center w-full bg-gray-100 rounded-xl p-2 text-gray-500 text-sm"> {formattedDate} </div>
                    <div className="flex item-center justify-center w-full bg-gray-100 rounded-xl p-2 text-gray-500 text-sm px-1.5 py-4"> {diary.weather} </div>
                    <Link to={`/emotions/${diary.emotion}`} className="flex item-center w-full justify-center bg-gray-100 rounded-xl p-2 text-gray-500 text-sm px-1.5 py-4"> {diary.emotion} </Link>
                </div>
                
            </div>

        </div>
    )
}
