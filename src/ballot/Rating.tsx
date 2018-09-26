import * as React from 'react';
import municipalLeagueImgSrc from "../img/torch_white.svg";

interface IRating {
    ratingLevel: number,
    hideRatingCallback: () => void
}


class Rating extends React.Component<IRating> {
    public render() {
        const dict = [
            {
                ratingExplination: "When the Candidate Evaluations Committee determines, after diligent investigation, that it has no more information about the candidate than an uninformed voter would have. A candidate who fails to complete a candidate questionnaire or is not interviewed or both may still be rated when the Committee has obtained information about the candidate through its other sources of information.",
                ratingTitle: "Insufficient Info"
            },
            {
                ratingExplination: "Doesn't appear engaged, has a record that casts doubt on ability to be productive, hasn't demonstrated ability to deal with responsibilities of office, has narrow focus, inflexible attitude or is otherwise troubling.",
                ratingTitle: "Not Qualified"
            },
            {
                ratingExplination: "Has a record of participation and interest, is effective on specific issues, has provoked questions about suitability as an office holder, will need significant time/energy to fill gaps in knowledge.",
                ratingTitle: "Adequate"
            },
            {
                ratingExplination: "Has been active and effective in many roles, is capable of moving people to productive action, has strong record of participation in problem solving, shows satisfactory commitment to tackling issues.",
                ratingTitle: "Good"
            },
            {
                ratingExplination: "Makes significant contributions, is a skilled builder of consensus, inspires confidence in the way they would serve, is thorough and attentive to issues.",
                ratingTitle: "Very Good"
            },
            {
                ratingExplination: "Has made numerous outstanding contributions requiring skills related to the office, is a path-finding and respected leader, brings knowledge and creativity to issues facing the office.",
                ratingTitle: "Outstanding"
            }
        ]

        const { ratingTitle, ratingExplination } = dict[this.props.ratingLevel];

        return (
            <div className="rating-overlay" style={{ display: "flex" }}>
                <div className="rating">
                    <img src={municipalLeagueImgSrc} alt="Torch Logo" style={{ margin: "0 auto" }} width="35" height="35" />
                    <div>Municipal League Rating</div>
                    <span className="overlay-title">{ratingTitle}</span>
                    {ratingExplination}
                    <div className="rating-close" onClick={this.props.hideRatingCallback}>CLOSE</div>
                </div>
            </div>
        );
    }
}

export default Rating;
