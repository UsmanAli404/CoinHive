import styles from './userProfile.module.css'
import profileImage from '../../../assets/coinhive_favicon.svg'

function UserProfile({ profile }){
    if (!profile) {
        return <div>Loading...</div>;
    }

    const formattedDate = new Date(profile.joinedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <div className={styles.profileImage}>
                    <img src={profileImage} alt="Profile" />
                </div>
                <h3 className={styles.userName}>{profile.name || 'Unknown User'}</h3>
                <button className={styles.editButton}>Edit Profile</button>
            </div>

            <div className={styles.accountInfo}>
                <h4>Account</h4>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Join Date</span>
                    <span className={styles.infoValue}>{formattedDate || 'N/A'}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Balance </span>
                    <span className={styles.infoValue}>
                        {(profile.balance || 0).toFixed(2) + '$'}
                    </span>
                </div>
            </div>

            <div className={styles.assetsInfo}>
                <h4>Assets</h4>
                {profile.assets && profile.assets.length > 0 ? (
                    profile.assets.map((item, index) => (
                        <div className={styles.infoItem} key={index}>
                            <span className={styles.infoLabel}>{item.asset}</span>
                            <span className={styles.infoValue}>{item.quantity}</span>
                        </div>
                    ))
                ) : (
                    <div>No assets available</div>
                )}
                <button className={styles.moreButton}>More assets...</button>
            </div>
        </div>
    )
}

export default UserProfile
