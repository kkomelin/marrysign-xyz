/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace MarrySign {
  export type AgreementStruct = {
    id: PromiseOrValue<BytesLike>;
    alice: PromiseOrValue<string>;
    bob: PromiseOrValue<string>;
    content: PromiseOrValue<BytesLike>;
    terminationCost: PromiseOrValue<BigNumberish>;
    state: PromiseOrValue<BigNumberish>;
    updatedAt: PromiseOrValue<BigNumberish>;
  };

  export type AgreementStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    number,
    BigNumber
  ] & {
    id: string;
    alice: string;
    bob: string;
    content: string;
    terminationCost: BigNumber;
    state: number;
    updatedAt: BigNumber;
  };
}

export interface MarrySignInterface extends utils.Interface {
  functions: {
    "acceptAgreement(bytes32,uint256)": FunctionFragment;
    "createAgreement(address,bytes,uint256,uint256)": FunctionFragment;
    "getAcceptedAgreementCount()": FunctionFragment;
    "getAcceptedAgreements()": FunctionFragment;
    "getAgreement(bytes32)": FunctionFragment;
    "getAgreementByAddress(address)": FunctionFragment;
    "getAgreementCount()": FunctionFragment;
    "getFee()": FunctionFragment;
    "getPaginatedAgreements(uint256,uint256)": FunctionFragment;
    "refuseAgreement(bytes32,uint256)": FunctionFragment;
    "setFee(uint256)": FunctionFragment;
    "terminateAgreement(bytes32)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "acceptAgreement"
      | "createAgreement"
      | "getAcceptedAgreementCount"
      | "getAcceptedAgreements"
      | "getAgreement"
      | "getAgreementByAddress"
      | "getAgreementCount"
      | "getFee"
      | "getPaginatedAgreements"
      | "refuseAgreement"
      | "setFee"
      | "terminateAgreement"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "acceptAgreement",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createAgreement",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAcceptedAgreementCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAcceptedAgreements",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAgreement",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAgreementByAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAgreementCount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPaginatedAgreements",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "refuseAgreement",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "terminateAgreement",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "acceptAgreement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAgreement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAcceptedAgreementCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAcceptedAgreements",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAgreement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAgreementByAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAgreementCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPaginatedAgreements",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "refuseAgreement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "terminateAgreement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "AgreementAccepted(bytes32)": EventFragment;
    "AgreementCreated(bytes32)": EventFragment;
    "AgreementRefused(bytes32)": EventFragment;
    "AgreementTerminated(bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AgreementAccepted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AgreementCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AgreementRefused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AgreementTerminated"): EventFragment;
}

export interface AgreementAcceptedEventObject {
  id: string;
}
export type AgreementAcceptedEvent = TypedEvent<
  [string],
  AgreementAcceptedEventObject
>;

export type AgreementAcceptedEventFilter =
  TypedEventFilter<AgreementAcceptedEvent>;

export interface AgreementCreatedEventObject {
  id: string;
}
export type AgreementCreatedEvent = TypedEvent<
  [string],
  AgreementCreatedEventObject
>;

export type AgreementCreatedEventFilter =
  TypedEventFilter<AgreementCreatedEvent>;

export interface AgreementRefusedEventObject {
  id: string;
}
export type AgreementRefusedEvent = TypedEvent<
  [string],
  AgreementRefusedEventObject
>;

export type AgreementRefusedEventFilter =
  TypedEventFilter<AgreementRefusedEvent>;

export interface AgreementTerminatedEventObject {
  id: string;
}
export type AgreementTerminatedEvent = TypedEvent<
  [string],
  AgreementTerminatedEventObject
>;

export type AgreementTerminatedEventFilter =
  TypedEventFilter<AgreementTerminatedEvent>;

export interface MarrySign extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarrySignInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptAgreement(
      id: PromiseOrValue<BytesLike>,
      acceptedAt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createAgreement(
      bob: PromiseOrValue<string>,
      content: PromiseOrValue<BytesLike>,
      terminationCost: PromiseOrValue<BigNumberish>,
      createdAt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAcceptedAgreementCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getAcceptedAgreements(
      overrides?: CallOverrides
    ): Promise<[MarrySign.AgreementStructOutput[]]>;

    getAgreement(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[MarrySign.AgreementStructOutput]>;

    getAgreementByAddress(
      partnerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[MarrySign.AgreementStructOutput]>;

    getAgreementCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPaginatedAgreements(
      _pageNum: PromiseOrValue<BigNumberish>,
      _resultsPerPage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[MarrySign.AgreementStructOutput[]]>;

    refuseAgreement(
      id: PromiseOrValue<BytesLike>,
      refusedAt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    terminateAgreement(
      id: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  acceptAgreement(
    id: PromiseOrValue<BytesLike>,
    acceptedAt: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createAgreement(
    bob: PromiseOrValue<string>,
    content: PromiseOrValue<BytesLike>,
    terminationCost: PromiseOrValue<BigNumberish>,
    createdAt: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAcceptedAgreementCount(overrides?: CallOverrides): Promise<BigNumber>;

  getAcceptedAgreements(
    overrides?: CallOverrides
  ): Promise<MarrySign.AgreementStructOutput[]>;

  getAgreement(
    id: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<MarrySign.AgreementStructOutput>;

  getAgreementByAddress(
    partnerAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<MarrySign.AgreementStructOutput>;

  getAgreementCount(overrides?: CallOverrides): Promise<BigNumber>;

  getFee(overrides?: CallOverrides): Promise<BigNumber>;

  getPaginatedAgreements(
    _pageNum: PromiseOrValue<BigNumberish>,
    _resultsPerPage: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<MarrySign.AgreementStructOutput[]>;

  refuseAgreement(
    id: PromiseOrValue<BytesLike>,
    refusedAt: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFee(
    _fee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  terminateAgreement(
    id: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptAgreement(
      id: PromiseOrValue<BytesLike>,
      acceptedAt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createAgreement(
      bob: PromiseOrValue<string>,
      content: PromiseOrValue<BytesLike>,
      terminationCost: PromiseOrValue<BigNumberish>,
      createdAt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAcceptedAgreementCount(overrides?: CallOverrides): Promise<BigNumber>;

    getAcceptedAgreements(
      overrides?: CallOverrides
    ): Promise<MarrySign.AgreementStructOutput[]>;

    getAgreement(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<MarrySign.AgreementStructOutput>;

    getAgreementByAddress(
      partnerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<MarrySign.AgreementStructOutput>;

    getAgreementCount(overrides?: CallOverrides): Promise<BigNumber>;

    getFee(overrides?: CallOverrides): Promise<BigNumber>;

    getPaginatedAgreements(
      _pageNum: PromiseOrValue<BigNumberish>,
      _resultsPerPage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<MarrySign.AgreementStructOutput[]>;

    refuseAgreement(
      id: PromiseOrValue<BytesLike>,
      refusedAt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    terminateAgreement(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "AgreementAccepted(bytes32)"(id?: null): AgreementAcceptedEventFilter;
    AgreementAccepted(id?: null): AgreementAcceptedEventFilter;

    "AgreementCreated(bytes32)"(id?: null): AgreementCreatedEventFilter;
    AgreementCreated(id?: null): AgreementCreatedEventFilter;

    "AgreementRefused(bytes32)"(id?: null): AgreementRefusedEventFilter;
    AgreementRefused(id?: null): AgreementRefusedEventFilter;

    "AgreementTerminated(bytes32)"(id?: null): AgreementTerminatedEventFilter;
    AgreementTerminated(id?: null): AgreementTerminatedEventFilter;
  };

  estimateGas: {
    acceptAgreement(
      id: PromiseOrValue<BytesLike>,
      acceptedAt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createAgreement(
      bob: PromiseOrValue<string>,
      content: PromiseOrValue<BytesLike>,
      terminationCost: PromiseOrValue<BigNumberish>,
      createdAt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAcceptedAgreementCount(overrides?: CallOverrides): Promise<BigNumber>;

    getAcceptedAgreements(overrides?: CallOverrides): Promise<BigNumber>;

    getAgreement(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAgreementByAddress(
      partnerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAgreementCount(overrides?: CallOverrides): Promise<BigNumber>;

    getFee(overrides?: CallOverrides): Promise<BigNumber>;

    getPaginatedAgreements(
      _pageNum: PromiseOrValue<BigNumberish>,
      _resultsPerPage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    refuseAgreement(
      id: PromiseOrValue<BytesLike>,
      refusedAt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    terminateAgreement(
      id: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptAgreement(
      id: PromiseOrValue<BytesLike>,
      acceptedAt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createAgreement(
      bob: PromiseOrValue<string>,
      content: PromiseOrValue<BytesLike>,
      terminationCost: PromiseOrValue<BigNumberish>,
      createdAt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAcceptedAgreementCount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAcceptedAgreements(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAgreement(
      id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAgreementByAddress(
      partnerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAgreementCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPaginatedAgreements(
      _pageNum: PromiseOrValue<BigNumberish>,
      _resultsPerPage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    refuseAgreement(
      id: PromiseOrValue<BytesLike>,
      refusedAt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    terminateAgreement(
      id: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
