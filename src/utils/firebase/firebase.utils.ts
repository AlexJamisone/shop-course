import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
    onAuthStateChanged,
    NextOrObserver,
    User
} from 'firebase/auth'
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore'

import { Category } from '../../store/categories/categories.types'

const firebaseConfig = {
	apiKey: 'AIzaSyDcZC40a3JROvSEleDA-yI8V0xJncnRWwU',
	authDomain: 'shop-course-92be2.firebaseapp.com',
	projectId: 'shop-course-92be2',
	storageBucket: 'shop-course-92be2.appspot.com',
	messagingSenderId: '499929262048',
	appId: '1:499929262048:web:a52e1e2f4cd1976303ad85',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export type ObjectToAdd = {
	title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const colletionRef = collection(db, collectionKey)
	const batch = writeBatch(db)
	objectsToAdd.forEach((object) => {
		const docRef = doc(colletionRef, object.title.toLowerCase())
		batch.set(docRef, object)
	})

	await batch.commit()
	console.log(`done`)
}

export const getCategoriesAndDocument = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories')
	const q = query(collectionRef)

	const querySnapshot = await getDocs(q)
	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	)
}

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date
    displayName: string
    email: string
}


export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return

	const userDocRef = doc(db, 'users', userAuth.uid)

	const userSnapshot = await getDoc(userDocRef)

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			})
		} catch (error) {
			console.log(`error creating the user`, error)
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return
	return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return
	return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback)

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe()
				resolve(userAuth)
			},
			reject
		)
	})
}
