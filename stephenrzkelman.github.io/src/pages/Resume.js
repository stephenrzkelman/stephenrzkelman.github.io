import resume from '../resources/Stephen-Kelman.pdf';

function Resume() {
    return (
        <div>
            <embed 
                src={resume} 
                type="application/pdf"
                height="1500px"
                width="100%"
            />
        </div>
    );
}

export default Resume;
