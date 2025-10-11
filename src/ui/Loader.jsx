import '../css/Loader.css'; // Custom styles for the loader

const Loader = () => <div className="loader-overlay">
    <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
</div>


export const InsideLoader = ({title = 'Loading...'}) => <div className="inside-loader">
    <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{title}</span>
    </div>
</div>


export default Loader;