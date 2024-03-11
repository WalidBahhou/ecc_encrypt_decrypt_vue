<script setup lang="ts">
import { ref } from "vue";
import { eccService } from "./services/ecc_service";
const ecc_service_instance: eccService = eccService.getInstance();

let keys = ref();
let encryptedMessage = ref();
let encryptedText = ref();
let json = ref();
let enncryptedHex = ref();
let message = ref();
let messageToDecrypt = ref();
let descryptedText = ref();

const encr = (msg: string) => {
  ecc_service_instance.encrypt(msg).then((res) => {
    console.log("res :>> ", res);
    encryptedMessage.value = res;
    enncryptedHex.value = res.encryptedHex;
    encryptedText.value = res.encryptedText;
    json.value = JSON.stringify(res.encrypted, null, 1);
  });
};

const decr = (encr: any) => {
  ecc_service_instance.decrypt(encr).then((res) => {
    console.log("res :>> ", res.decryptedMesasge);
    descryptedText.value = res.decryptedMesasge;
  });
};

const setKeys = () => {
  ecc_service_instance.setkeys().then((res) => {
    keys.value = res;
    console.log("res :>> ", res);
  });
};
</script>

<template>
  <div class="w-full flex flex-col bg-white">
    <header class="flex flex-row h-48 w-full justify-between">
      <div class="flex flex-row items-center">
        <img
          src="./assets/ecc.png"
          alt=""
          width="200"
          height="200"
          class="mt-3 ml-3"
        />
        <p class="font-semibold">
          Elliptic Curve Cryptography<br />Encrypter/Decrypter<br />by Alaa
          Bahhou
        </p>
      </div>
      <img src="./assets/ensa.png" alt="" />
    </header>
    <div class="flex flex-col self-center items-center w-1/2">
      <button
        class="p-2 rounded shadow dark:text-gray-400 dark:bg-gray-800"
        @click="setKeys"
      >
        Generate Keys
      </button>
      <div class="mb-1 mt-2">
        <p class="font-light ml-1">Public Key</p>
        <textarea
          class="resize-none bg-slate-100 break-words overflow-hidden text-sm pt-1 px-2 rounded shadow border border-1 border-gray-300"
          name=""
          id=""
          cols="60"
          rows="2"
          :value="keys ? keys.pubKey : ''"
          placeholder="Public key..."
        ></textarea>
      </div>
      <div class="mb-1 mt-2">
        <p class="font-light ml-1">Private Key</p>
        <textarea
          class="h-8 resize-none bg-slate-100 break-words overflow-hidden text-sm pt-1 px-2 rounded shadow border border-1 border-gray-300"
          name=""
          id=""
          cols="60"
          rows="2"
          :value="keys ? keys.privKey : ''"
          placeholder="Private key..."
        ></textarea>
      </div>
    </div>
    <div class="w-full flex flex-row mt-5">
      <div class="flex flex-row w-1/2">
        <div class="flex flex-col w-1/2">
          <div class="items-center flex flex-col">
            <div class="flex flex-col">
              <textarea
                class="rounded p-3 bg-slate-100 border border-1 border-gray-400 shadow-xl"
                placeholder="Text to encrypt..."
                name=""
                id=""
                cols="40"
                rows="19"
                v-model="message"
              />
              <button
                class="mt-5 p-2 rounded dark:text-gray-400 dark:bg-gray-800"
                @click="encr(message)"
              >
                Encrypt
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-1/2 items-center">
          <div class="mb-3">
            <textarea
              class="rounded p-3 bg-slate-100 border border-1 border-gray-400 shadow-xl"
              placeholder="Raw Encrypted Text..."
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="encryptedText"
            />
          </div>
          <div>
            <textarea
              placeholder="Hexadecimal value of encrypted text..."
              class="rounded p-3 bg-slate-100 border border-1 border-gray-400 shadow-xl"
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="enncryptedHex"
            />
          </div>
        </div>
      </div>
      <!-- <div class="w-1 h-80 bg-gray-700 shadow-lg mt-16"></div> -->
      <div class="w-1/2">
        <div class="flex flex-row w-full justify-around">
          <div class="flex flex-col">
            <textarea
              class="rounded p-3 bg-slate-100 border border-1 border-gray-400 shadow-xl"
              name=""
              id=""
              cols="40"
              rows="19"
              placeholder="Hexadecimal value of the encrypted text..."
              v-model="messageToDecrypt"
            />
            <button
              class="mt-5 p-2 rounded dark:text-gray-400 dark:bg-gray-800"
              @click="decr(messageToDecrypt)"
            >
              Decrypt
            </button>
          </div>
          <textarea
            placeholder="Original text..."
            class="rounded p-3 bg-slate-100 border border-1 border-gray-400 shadow-xl"
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="descryptedText"
          />
        </div>
      </div>
    </div>
  </div>
</template>
