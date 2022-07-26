import './spinner.scss'

const Spinner = ({mainLoad, modifi}) => {
  return (
    <div className='spinner-overlay'>
        <div className={`${mainLoad} ${modifi}`}/>
    </div>
  )
}

export default Spinner