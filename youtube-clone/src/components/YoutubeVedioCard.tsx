import Image from 'next/image';
export function YoutubeVedioCard(props: any){
     return <div >
          <img className={'rounded-xl'} src={props.image} />

          <div className='flex flex-row pt-2'>
               <div className='col-span-1' >
               <img className={'rounded-full w-12 h-12'} src={props.image} />
               
               </div>
               <div className='col-span-11 pl-2'>
                    <div>{props.title}</div>
                    <div className={'col-span-11 text-gray-500 text-base'}>{props.author}</div>
                    <div className='col-span-11 text-gray-500 text-base' >{props.views} | {props.timeatamp} </div>
               </div>
          </div>
     </div>
}