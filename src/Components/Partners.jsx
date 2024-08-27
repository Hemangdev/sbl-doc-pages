const Partners = ({ content = "" }) => {
  
  return (
    <div className='container' dangerouslySetInnerHTML={{ __html: content }}></div>
  )
}

export default Partners