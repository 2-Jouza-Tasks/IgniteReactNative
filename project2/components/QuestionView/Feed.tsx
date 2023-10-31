import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const videoData = [
  {
    id: '1',
    user: 'user1',
    videoUrl: 'https://www.example.com/video1.mp4',
    caption: 'Awesome video!',
    likes: 1000,
    comments: 50,
  },
  // Add more video data objects here
];



const FeedScreen = () => {
  return (
    <View style={styles.videoCard}>
      {/* Video Player */}
      <VideoPlayer source={{ uri: item.videoUrl }} />

      {/* User Profile Information */}
      <View style={styles.userInfo}>
        <Image source={{ uri: 'user_profile_image_url' }} style={styles.userAvatar} />
        <Text style={styles.username}>{item.user}</Text>
      </View>

      {/* Engagement Icons (Likes, Comments, Share) */}
      <View style={styles.engagementIcons}>
        <TouchableOpacity style={styles.icon}>
          {/* Heart icon for liking */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          {/* Comment icon for commenting */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          {/* Share icon for sharing */}
        </TouchableOpacity>
      </View>

      {/* Video Caption */}
      <Text style={styles.caption}>{item.caption}</Text>

      {/* Likes and Comments Count */}
      <Text style={styles.likesCount}>{item.likes} likes</Text>
      <Text style={styles.commentsCount}>{item.comments} comments</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  videoCard: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  engagementIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    padding: 10,
    fontSize: 16,
  },
  likesCount: {
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  commentsCount: {
    paddingLeft: 10,
  },
});

export default FeedScreen;
