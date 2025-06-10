import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddExerciseInput = {
  exerciseID: Scalars['ID']['input'];
  workoutID?: InputMaybe<Scalars['ID']['input']>;
};

export type AddExercisesInput = {
  exerciseIDs: Array<Scalars['ID']['input']>;
  workoutID?: InputMaybe<Scalars['ID']['input']>;
};

export type AuthInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
};

export type CreateExerciseInput = {
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firsName?: InputMaybe<Scalars['String']['input']>;
  heightInFt?: InputMaybe<Scalars['Float']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone_number: Scalars['String']['input'];
  weightInPounds?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateWorkoutInput = {
  createdAt?: InputMaybe<Scalars['Time']['input']>;
  dateTimeWorkoutEnd?: InputMaybe<Scalars['Time']['input']>;
  dateTimeWorkoutStart?: InputMaybe<Scalars['Time']['input']>;
  exercises?: InputMaybe<Array<ExerciseInput>>;
  name: Scalars['String']['input'];
  percentageCompleted?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['Time']['input']>;
  userFeeling?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type Exercise = {
  __typename?: 'Exercise';
  bodyPart?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type ExerciseInfo = {
  __typename?: 'ExerciseInfo';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ExerciseInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addExerciseToWorkout?: Maybe<Exercise>;
  addExercisesToWorkout?: Maybe<Array<Maybe<Exercise>>>;
  addSets: Array<Set>;
  createExercise?: Maybe<Exercise>;
  createUser: User;
  createWorkout?: Maybe<Workout>;
  deleteExerciseFromWorkout: Scalars['ID']['output'];
  deleteSet?: Maybe<Scalars['Boolean']['output']>;
  deleteWorkout: Scalars['ID']['output'];
  submitWorkoutDetail?: Maybe<WorkoutDetailResponse>;
  updateUser: User;
  updateWorkout?: Maybe<Workout>;
  verifySMS: User;
  voiceToWorkout?: Maybe<VoiceWorkoutResult>;
};


export type MutationAddExerciseToWorkoutArgs = {
  input?: InputMaybe<AddExerciseInput>;
};


export type MutationAddExercisesToWorkoutArgs = {
  input?: InputMaybe<AddExercisesInput>;
};


export type MutationAddSetsArgs = {
  input?: InputMaybe<SetsInput>;
};


export type MutationCreateExerciseArgs = {
  input?: InputMaybe<CreateExerciseInput>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
};


export type MutationDeleteExerciseFromWorkoutArgs = {
  id: Scalars['ID']['input'];
  workoutID: Scalars['ID']['input'];
};


export type MutationDeleteSetArgs = {
  input?: InputMaybe<DeleteSetInput>;
};


export type MutationDeleteWorkoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitWorkoutDetailArgs = {
  input: WorkoutDetailInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateWorkoutArgs = {
  input: UpdateWorkoutInput;
};


export type MutationVerifySmsArgs = {
  input: AuthInput;
};


export type MutationVoiceToWorkoutArgs = {
  file: Scalars['Upload']['input'];
};

export type Query = {
  __typename?: 'Query';
  exercise?: Maybe<Exercise>;
  getExercises?: Maybe<Array<Maybe<Exercise>>>;
  user?: Maybe<User>;
  userWorkoutWeightStats?: Maybe<Array<Maybe<WorkoutWeightStats>>>;
  workout?: Maybe<WorkoutSpecifics>;
  workouts?: Maybe<Array<Maybe<Workout>>>;
};


export type QueryExerciseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserWorkoutWeightStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryWorkoutArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkoutsArgs = {
  userId: Scalars['ID']['input'];
};

export type Set = {
  __typename?: 'Set';
  id: Scalars['ID']['output'];
  numberOfReps: Scalars['Int']['output'];
  restsInSeconds?: Maybe<Scalars['Int']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
  workoutExerciseID: Scalars['ID']['output'];
};

export type SetInfo = {
  __typename?: 'SetInfo';
  exerciseID?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  numOfReps?: Maybe<Scalars['Int']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
};

export type SetInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  numberOfReps: Scalars['Int']['input'];
  restsInSeconds?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type SetsInput = {
  WorkoutID?: InputMaybe<Scalars['ID']['input']>;
  exerciseID?: InputMaybe<Scalars['ID']['input']>;
  sets: Array<SetInput>;
};

export type UpdateUserInput = {
  HeightInFt?: InputMaybe<Scalars['Float']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  weightInPounds?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateWorkoutInput = {
  createdAt?: InputMaybe<Scalars['Time']['input']>;
  dateTimeWorkoutEnd?: InputMaybe<Scalars['Time']['input']>;
  dateTimeWorkoutStart?: InputMaybe<Scalars['Time']['input']>;
  exercises?: InputMaybe<Array<ExerciseInput>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  percentageCompleted?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['Time']['input']>;
  userFeeling?: InputMaybe<Scalars['String']['input']>;
  userID?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Time']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  heightInFt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
  weightInPounds?: Maybe<Scalars['Float']['output']>;
};

export type VoiceWorkoutResult = {
  __typename?: 'VoiceWorkoutResult';
  exercise?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  sets?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['Time']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type Workout = {
  __typename?: 'Workout';
  createTime?: Maybe<Scalars['Time']['output']>;
  createdAt?: Maybe<Scalars['Time']['output']>;
  dateTimeWorkoutEnd?: Maybe<Scalars['Time']['output']>;
  dateTimeWorkoutStart?: Maybe<Scalars['Time']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percentageCompleted?: Maybe<Scalars['Float']['output']>;
  updateTime?: Maybe<Scalars['Time']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
  userFeeling?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type WorkoutDetail = {
  __typename?: 'WorkoutDetail';
  exercises?: Maybe<Array<Exercise>>;
  id: Scalars['ID']['output'];
  workoutDuration?: Maybe<Scalars['Int']['output']>;
  workoutEnd?: Maybe<Scalars['String']['output']>;
  workoutStart?: Maybe<Scalars['String']['output']>;
};

export type WorkoutDetailInput = {
  exercises?: InputMaybe<Array<ExerciseInput>>;
  workoutDuration?: InputMaybe<Scalars['Int']['input']>;
  workoutEnd?: InputMaybe<Scalars['String']['input']>;
  workoutStart?: InputMaybe<Scalars['String']['input']>;
};

export type WorkoutDetailResponse = {
  __typename?: 'WorkoutDetailResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  workoutDetail?: Maybe<WorkoutDetail>;
};

export type WorkoutSpecifics = {
  __typename?: 'WorkoutSpecifics';
  createdAt?: Maybe<Scalars['Time']['output']>;
  exercises?: Maybe<Array<Maybe<ExerciseInfo>>>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sets?: Maybe<Array<Maybe<SetInfo>>>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type WorkoutWeightStats = {
  __typename?: 'WorkoutWeightStats';
  date?: Maybe<Scalars['Time']['output']>;
  totalWeight: Scalars['Float']['output'];
  workoutId: Scalars['ID']['output'];
  workoutName?: Maybe<Scalars['String']['output']>;
};

export type DeleteSetInput = {
  exerciseID?: InputMaybe<Scalars['ID']['input']>;
  setID?: InputMaybe<Scalars['ID']['input']>;
  workoutID?: InputMaybe<Scalars['ID']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddExerciseInput: AddExerciseInput;
  AddExercisesInput: AddExercisesInput;
  AuthInput: AuthInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateExerciseInput: CreateExerciseInput;
  CreateUserInput: CreateUserInput;
  CreateWorkoutInput: CreateWorkoutInput;
  Exercise: ResolverTypeWrapper<Exercise>;
  ExerciseInfo: ResolverTypeWrapper<ExerciseInfo>;
  ExerciseInput: ExerciseInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Set: ResolverTypeWrapper<Set>;
  SetInfo: ResolverTypeWrapper<SetInfo>;
  SetInput: SetInput;
  SetsInput: SetsInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UpdateUserInput: UpdateUserInput;
  UpdateWorkoutInput: UpdateWorkoutInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  VoiceWorkoutResult: ResolverTypeWrapper<VoiceWorkoutResult>;
  Workout: ResolverTypeWrapper<Workout>;
  WorkoutDetail: ResolverTypeWrapper<WorkoutDetail>;
  WorkoutDetailInput: WorkoutDetailInput;
  WorkoutDetailResponse: ResolverTypeWrapper<WorkoutDetailResponse>;
  WorkoutSpecifics: ResolverTypeWrapper<WorkoutSpecifics>;
  WorkoutWeightStats: ResolverTypeWrapper<WorkoutWeightStats>;
  deleteSetInput: DeleteSetInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddExerciseInput: AddExerciseInput;
  AddExercisesInput: AddExercisesInput;
  AuthInput: AuthInput;
  Boolean: Scalars['Boolean']['output'];
  CreateExerciseInput: CreateExerciseInput;
  CreateUserInput: CreateUserInput;
  CreateWorkoutInput: CreateWorkoutInput;
  Exercise: Exercise;
  ExerciseInfo: ExerciseInfo;
  ExerciseInput: ExerciseInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  Set: Set;
  SetInfo: SetInfo;
  SetInput: SetInput;
  SetsInput: SetsInput;
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  UpdateUserInput: UpdateUserInput;
  UpdateWorkoutInput: UpdateWorkoutInput;
  Upload: Scalars['Upload']['output'];
  User: User;
  VoiceWorkoutResult: VoiceWorkoutResult;
  Workout: Workout;
  WorkoutDetail: WorkoutDetail;
  WorkoutDetailInput: WorkoutDetailInput;
  WorkoutDetailResponse: WorkoutDetailResponse;
  WorkoutSpecifics: WorkoutSpecifics;
  WorkoutWeightStats: WorkoutWeightStats;
  deleteSetInput: DeleteSetInput;
};

export type DeferDirectiveArgs = {
  if?: Maybe<Scalars['Boolean']['input']>;
  label?: Maybe<Scalars['String']['input']>;
};

export type DeferDirectiveResolver<Result, Parent, ContextType = any, Args = DeferDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExerciseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exercise'] = ResolversParentTypes['Exercise']> = {
  bodyPart?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExerciseInfo'] = ResolversParentTypes['ExerciseInfo']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addExerciseToWorkout?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType, Partial<MutationAddExerciseToWorkoutArgs>>;
  addExercisesToWorkout?: Resolver<Maybe<Array<Maybe<ResolversTypes['Exercise']>>>, ParentType, ContextType, Partial<MutationAddExercisesToWorkoutArgs>>;
  addSets?: Resolver<Array<ResolversTypes['Set']>, ParentType, ContextType, Partial<MutationAddSetsArgs>>;
  createExercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType, Partial<MutationCreateExerciseArgs>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createWorkout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<MutationCreateWorkoutArgs, 'input'>>;
  deleteExerciseFromWorkout?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteExerciseFromWorkoutArgs, 'id' | 'workoutID'>>;
  deleteSet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationDeleteSetArgs>>;
  deleteWorkout?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteWorkoutArgs, 'id'>>;
  submitWorkoutDetail?: Resolver<Maybe<ResolversTypes['WorkoutDetailResponse']>, ParentType, ContextType, RequireFields<MutationSubmitWorkoutDetailArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  updateWorkout?: Resolver<Maybe<ResolversTypes['Workout']>, ParentType, ContextType, RequireFields<MutationUpdateWorkoutArgs, 'input'>>;
  verifySMS?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationVerifySmsArgs, 'input'>>;
  voiceToWorkout?: Resolver<Maybe<ResolversTypes['VoiceWorkoutResult']>, ParentType, ContextType, RequireFields<MutationVoiceToWorkoutArgs, 'file'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  exercise?: Resolver<Maybe<ResolversTypes['Exercise']>, ParentType, ContextType, RequireFields<QueryExerciseArgs, 'id'>>;
  getExercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['Exercise']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userWorkoutWeightStats?: Resolver<Maybe<Array<Maybe<ResolversTypes['WorkoutWeightStats']>>>, ParentType, ContextType, RequireFields<QueryUserWorkoutWeightStatsArgs, 'limit' | 'userId'>>;
  workout?: Resolver<Maybe<ResolversTypes['WorkoutSpecifics']>, ParentType, ContextType, RequireFields<QueryWorkoutArgs, 'id'>>;
  workouts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Workout']>>>, ParentType, ContextType, RequireFields<QueryWorkoutsArgs, 'userId'>>;
};

export type SetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Set'] = ResolversParentTypes['Set']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numberOfReps?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  restsInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  workoutExerciseID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetInfo'] = ResolversParentTypes['SetInfo']> = {
  exerciseID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  numOfReps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  heightInFt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  weightInPounds?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoiceWorkoutResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoiceWorkoutResult'] = ResolversParentTypes['VoiceWorkoutResult']> = {
  exercise?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  reps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workout'] = ResolversParentTypes['Workout']> = {
  createTime?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  dateTimeWorkoutEnd?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  dateTimeWorkoutStart?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  percentageCompleted?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updateTime?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  userFeeling?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkoutDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutDetail'] = ResolversParentTypes['WorkoutDetail']> = {
  exercises?: Resolver<Maybe<Array<ResolversTypes['Exercise']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workoutDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  workoutEnd?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workoutStart?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkoutDetailResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutDetailResponse'] = ResolversParentTypes['WorkoutDetailResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  workoutDetail?: Resolver<Maybe<ResolversTypes['WorkoutDetail']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkoutSpecificsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutSpecifics'] = ResolversParentTypes['WorkoutSpecifics']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  exercises?: Resolver<Maybe<Array<Maybe<ResolversTypes['ExerciseInfo']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sets?: Resolver<Maybe<Array<Maybe<ResolversTypes['SetInfo']>>>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkoutWeightStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkoutWeightStats'] = ResolversParentTypes['WorkoutWeightStats']> = {
  date?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  totalWeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  workoutId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workoutName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Exercise?: ExerciseResolvers<ContextType>;
  ExerciseInfo?: ExerciseInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Set?: SetResolvers<ContextType>;
  SetInfo?: SetInfoResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  VoiceWorkoutResult?: VoiceWorkoutResultResolvers<ContextType>;
  Workout?: WorkoutResolvers<ContextType>;
  WorkoutDetail?: WorkoutDetailResolvers<ContextType>;
  WorkoutDetailResponse?: WorkoutDetailResponseResolvers<ContextType>;
  WorkoutSpecifics?: WorkoutSpecificsResolvers<ContextType>;
  WorkoutWeightStats?: WorkoutWeightStatsResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  defer?: DeferDirectiveResolver<any, any, ContextType>;
};
