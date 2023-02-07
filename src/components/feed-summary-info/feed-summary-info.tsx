import styles from "./feed-summary-info.module.css";

interface IFeedSummaryInfo {
    text: string;
    sum: number;
}

function FeedSummaryInfo({ text, sum }: IFeedSummaryInfo): JSX.Element {
    return (
        <article className="mb-15">
            <h3 className="text text_type_main-medium">{text}</h3>
            <p className={`${styles.number} text text_type_digits-large`}>{sum}</p>
        </article>
    );
}

export default FeedSummaryInfo;
