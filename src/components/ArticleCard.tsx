import React from 'react';
import date from 'date-and-time';

type ArticleCardProps = {
  title: string,
  description: string,
  datePublished: string,
  url: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({title, description, datePublished, url}) => {
  let patternOld = date.compile('YYYY-MM-DD');
  let patternNew = date.compile('MMM DD, YYYY');
  return (
    <div
      className='flex flex-col justify-start items-start gap-3 px-5 py-4 w-full
              bg-slate-300 rounded-md'
    >
      <h3
        className='text-xl font-semibold first-letter:capitalize'
      >
        {title}
      </h3>
      <p>
        {description}
      </p>
      <p
        className="text-sm text-gray-500"
      >
        {/* 
          slice the date we need off the data, and transform the date into desired format/pattern
        */}
        {date.transform(datePublished.slice(0, 10), patternOld, patternNew)} --- <a href={url} target="_blank" rel='noopener noreferrer'><u>{url}</u></a>
      </p>
    </div>
  )
}

export default ArticleCard