import React from 'react'
import styles      from './UserProfile.module.css'
import profileImage from '../../../assets/logo.svg'

function UserProfile({ profile })
{
    if (!profile) {
        return <div>Loading...</div>; // Or a fallback UI if profile is null or undefined
    }

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
                    <span className={styles.infoLabel}>Joined</span>
                    <span className={styles.infoValue}>{profile.joinDate || 'N/A'}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Assets Total</span>
                    <span className={styles.infoValue}>{profile.totalAssets || '0'}</span>
                </div>
            </div>

            <div className={styles.assetsInfo}>
                <h4>Assets</h4>
                {profile.assets && profile.assets.length > 0 ? (
                    profile.assets.map((asset, index) => (
                        <div className={styles.infoItem} key={index}>
                            <span className={styles.infoLabel}>{asset.name}</span>
                            <span className={styles.infoValue}>{asset.value}</span>
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
