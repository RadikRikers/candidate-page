import { useState } from "react";
import condidateBackground from '../../assets/condidate-background.png';
import condidatePhoto from '../../assets/condidate.png';

import './condidate.css';

function ElectionPage(data) {

    const { socket } = data;

    const [candidateInfo, insertCandidateInfo] = useState(
        function () {
            socket.emit('getCandidateInfo');
            return (<div />)
        }
    );

    socket.on('upgradeCandidatePage', upgradeCandidatePage);

    function upgradeCandidatePage(info) {
        insertCandidateInfo(<CandidateInfo info={info} />)
    }

    function CandidateInfo(data) {
        const { info } = data;

        return (
            <div>
                <div className="condidateNameDiv">
                    <h1 className="condidateName">{info.condidateInfo[0].surname} {info.condidateInfo[0].first_name} {info.condidateInfo[0].patronymic}</h1>
                </div>
                <div className="slogansDiv">
                    <h1 className="slogan">{info.slogans[2].slogan}</h1>
                </div>
                <div className="partyDiv">
                    <h1 className="partyName">Партия: {info.condidateInfo[0].party_name}</h1>
                </div>
                <img className="condidateImage" src={condidatePhoto} />
                <div className="background" style={{ content: `url(${condidateBackground})` }} />
            </div>
        );
    }

    return (
        <div>
            {candidateInfo}
        </div>
    )
}

export default ElectionPage;