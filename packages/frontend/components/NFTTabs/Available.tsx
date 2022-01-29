/* eslint-disable @next/next/no-img-element */
import { ExclamationIcon } from '@heroicons/react/solid';
import React from 'react';
import { MyNFT } from '../../../hardhat/types/MyNFT';
import useAccountNFTs from '../../hooks/useAccountNFTs';
import useCurrency from '../../hooks/useCurrency';
import useListedPieces from '../../hooks/useListedPieces';
import useMint from '../../hooks/useMint';
import useOwner from '../../hooks/useOwner';
import usePause from '../../hooks/usePause';
import usePrice from '../../hooks/usePrice';

const Available = ({ contract }: { contract: MyNFT }): JSX.Element => {
  const isOwner = useOwner(contract);
  const currency = useCurrency();
  const { pieces } = useListedPieces(contract);
  const { price } = usePrice(contract);
  const { isPaused } = usePause(contract);
  const { mintNFT } = useMint(contract);
  const { nfts: myNfts, refetch } = useAccountNFTs(contract);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg mt-2">
      <div className="px-4 py-5 sm:p-6">
        {[isOwner, isPaused].includes(true) && (
          <div className="rounded-md bg-yellow-50 p-4 mb-2">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc">
                    {isOwner && (
                      <li>
                        {' '}
                        Wrapping an NFT means that you're depositing it into our smart contract. You won't be able to trade it until you unwrap it.
                      </li>
                    )}
                    {isPaused && (
                      <li>
                        {' '}
                        The Sale has been <span className="font-bold">PAUSED</span>, you will not be
                        able to mint any NTFs until the owner of the contract resumes the sale.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <h2 className="text-2xl mt-5 font-extrabold tracking-tight text-gray-900">Owned NFTs</h2>

        <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {pieces.map((piece) => (
            <div key={piece.tokenURI} className="group relative">
              <div className="px-2 py-3 rounded-md shadow-md border">
                <div className="w-full bg-gray-200 rounded-md overflow-hidden">
                  <a href={piece.tokenURI} target="_blank" rel="noreferrer">
                    <img
                      src={piece.metadata?.image}
                      alt={piece.metadata?.description}
                      className="w-full h-full object-contain lg:w-full lg:h-full"
                    />
                  </a>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p className="text-indigo-600 font-bold text-lg">
                        <span aria-hidden="true" className="inset-0" />
                        #0{piece.tokenId}
                      </p>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {isOwner ? 'Free' : `${price} ${currency}`}
                  </p>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    disabled={piece.minted}
                    onClick={() => {
                      mintNFT(piece.tokenId).then(() => {
                        refetch();
                      });
                    }}
                    className="inline-flex w-full justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-red-700 disabled:text-red-100" 
                  >
                    {piece.minted ? 'Unwrap' : 'Wrap'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Available;
