// type "rce" snippet to create a class component
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native'
import { Card, FAB } from 'react-native-paper'

export default function Home() {
    const [name, setName] = useState("Johan")
    const [data, setData] = useState()

    useEffect(() => {
        fetch("http://192.168.56.1:80/api/articles/", {
            method: "GET"
        }).then(res => res.json())
            .then(data => {
                setData(data)
            }).catch(err => { Alert.alert("Something went wrong", err) })
    }, [])

    const renderData = (item) => {
        return (
            <Card style={[styles.elementCardStyle, { backgroundColor: '#96c7c3' }]}>
                <Text style={styles.titleFlatList} >{item.title}</Text>
                <Text style={styles.descriptionFlatList} >{item.description}</Text>
            </Card>
        )
    }

    return (
        <View>
            <Card style={styles.cardStyle}>
                <Text style={styles.titleList}>{name}'s List</Text>
                <FlatList
                    data={data}
                    renderItem={(item) => {
                        return renderData(item.item)
                    }}
                    keyExtractor={item => item.id}
                />
            </Card>
            <FAB style={styles.fab}
                small={false}
                icon="plus"
                onPress={() => console.log("Pressed")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        padding: 5,
        margin: 20,
    },
    elementCardStyle: {
        padding: 10,
        margin: 10,
        backgroundColor: "#96c7c3",
    },
    titleList: {
        textAlign: "center",
        fontSize: 20,
        margin: 10,
    },
    titleFlatList: {
        fontSize: 16,
        fontWeight: "bold",
    },
    descriptionFlatList: {
        fontSize: 14,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#2dd26e",
    }
})