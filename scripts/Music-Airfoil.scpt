FasdUAS 1.101.10   ��   ��    k             l     ��  ��    9 3 homebridge-music/scripts/Music-Airfoil.applescript     � 	 	 f   h o m e b r i d g e - m u s i c / s c r i p t s / M u s i c - A i r f o i l . a p p l e s c r i p t   
  
 l     ��  ��    = 7 Copyright � 2016-2022 Erik Baauw. All rights reserved.     �   n   C o p y r i g h t   �   2 0 1 6 - 2 0 2 2   E r i k   B a a u w .   A l l   r i g h t s   r e s e r v e d .      l     ��������  ��  ��        l     ��  ��    9 3 Homebridge plugin for Music with Airplay speakers.     �   f   H o m e b r i d g e   p l u g i n   f o r   M u s i c   w i t h   A i r p l a y   s p e a k e r s .      l     ��������  ��  ��        l     ��  ��      Player: Music     �      P l a y e r :   M u s i c      l     ��   ��    B < Speakers: Airfoil, see: https://www.rogueamoeba.com/airfoil      � ! ! x   S p e a k e r s :   A i r f o i l ,   s e e :   h t t p s : / / w w w . r o g u e a m o e b a . c o m / a i r f o i l   " # " l     ��������  ��  ��   #  $ % $ i      & ' & I      �� (���� 0 getstate getState (  )�� ) o      ���� 0 i  ��  ��   ' Z     d * +�� , * G      - . - o     ���� 0 i   . =   	 / 0 / n     1 2 1 1    ��
�� 
prun 2 m     3 3�                                                                                      @ alis    "  macmini                        BD ����	Music.app                                                      ����            ����  
 cu             Applications   /:System:Applications:Music.app/   	 M u s i c . a p p    m a c m i n i  System/Applications/Music.app   / ��   0 m    ��
�� boovtrue + k    ^ 4 4  5 6 5 r     7 8 7 I    �������� $0 getspeakerstates getSpeakerStates��  ��   8 o      ���� 0 sp   6  9�� 9 O    ^ : ; : k    ] < <  = > = Z    C ? @�� A ? =    B C B 1    ��
�� 
pPlS C m    ��
�� ePlSkPSP @ k   " = D D  E F E Z   " 5 G H���� G o   " #���� 0 i   H O  & 1 I J I I   * 0�� K����  0 setaudiosource setAudioSource K  L�� L m   + , M M � N N 
 M u s i c��  ��   J  f   & '��  ��   F  O�� O r   6 = P Q P n   6 ; R S R 1   9 ;��
�� 
pnam S 1   6 9��
�� 
pTrk Q o      ���� 0 t  ��  ��   A r   @ C T U T m   @ A V V � W W   U o      ���� 0 t   >  X�� X e   D ] Y Y b   D ] Z [ Z b   D Y \ ] \ b   D W ^ _ ^ b   D U ` a ` b   D S b c b b   D Q d e d b   D M f g f b   D K h i h m   D E j j � k k  { " o n " : i l  E J l���� l =  E J m n m 1   E H��
�� 
pPlS n m   H I��
�� ePlSkPSP��  ��   g m   K L o o � p p  , " v o l u m e " : e 1   M P��
�� 
pVol c m   Q R q q � r r  , " t r a c k " : " a o   S T���� 0 t   _ m   U V s s � t t  " , " s p e a k e r s " : ] o   W X���� 0 sp   [ m   Y \ u u � v v  }��   ; m     w w�                                                                                      @ alis    "  macmini                        BD ����	Music.app                                                      ����            ����  
 cu             Applications   /:System:Applications:Music.app/   	 M u s i c . a p p    m a c m i n i  System/Applications/Music.app   / ��  ��  ��   , e   a d x x m   a d y y � z z � { " o n " : f a l s e , " v o l u m e " : 0 , " t r a c k " : " " , " s p e a k e r s " : { " C o m p u t e r " : { " o n " : f a l s e , " v o l u m e " : 0 } } } %  { | { l     ��������  ��  ��   |  } ~ } i      �  I      �� ����� 0 setplayeron setPlayerOn �  � � � o      ���� 0 o   �  ��� � o      ���� 0 t  ��  ��   � O     O � � � k    N � �  � � � Z    * � ��� � � o    ���� 0 o   � k    " � �  � � � O    � � � I    �� �����  0 setaudiosource setAudioSource �  ��� � m     � � � � � 
 M u s i c��  ��   �  f    	 �  � � � I   �� ���
�� .hookPlaynull��� ��� obj  � 4    �� �
�� 
cTrk � o    ���� 0 t  ��   �  ��� � r    " � � � m    ��
�� boovfals � 1    !��
�� 
pMut��  ��   � I  % *������
�� .hookStopnull��� ��� null��  ��   �  � � � Z   + @ � ��� � � =  + 0 � � � 1   + .��
�� 
pPlS � m   . /��
�� ePlSkPSP � r   3 : � � � n   3 8 � � � 1   6 8��
�� 
pnam � 1   3 6��
�� 
pTrk � o      ���� 0 t  ��   � k   = @ � �  � � � l  = =�� � ���   � %  tell me to setAllSpeakersOff()    � � � � >   t e l l   m e   t o   s e t A l l S p e a k e r s O f f ( ) �  ��� � r   = @ � � � m   = > � � � � �   � o      ���� 0 t  ��   �  ��� � e   A N � � b   A N � � � b   A L � � � b   A J � � � b   A H � � � m   A B � � � � �  { " o n " : � l  B G ����� � =  B G � � � 1   B E��
�� 
pPlS � m   E F��
�� ePlSkPSP��  ��   � m   H I � � � � �  , " t r a c k " : " � o   J K���� 0 t   � m   L M � � � � �  " }��   � m      � ��                                                                                      @ alis    "  macmini                        BD ����	Music.app                                                      ����            ����  
 cu             Applications   /:System:Applications:Music.app/   	 M u s i c . a p p    m a c m i n i  System/Applications/Music.app   / ��   ~  � � � l     ��������  ��  ��   �  � � � i     � � � I      �� ����� 0 changetrack changeTrack �  ��� � o      ���� 0 n  ��  ��   � O     F � � � k    E � �  � � � Z    ! � ����� � =   	 � � � 1    ��
�� 
pPlS � m    ��
�� ePlSkPSP � Z     � ��� � � o    ���� 0 n   � I   ������
�� .hookNextnull��� ��� null��  ��  ��   � I   ������
�� .hookPrevnull��� ��� null��  ��  ��  ��   �  � � � Z   " 7 � ��� � � =  " ' � � � 1   " %��
�� 
pPlS � m   % &��
�� ePlSkPSP � r   * 1 � � � n   * / � � � 1   - /��
�� 
pnam � 1   * -��
�� 
pTrk � o      ���� 0 t  ��   � k   4 7 � �  � � � l  4 4�� � ���   � %  tell me to setAllSpeakersOff()    � � � � >   t e l l   m e   t o   s e t A l l S p e a k e r s O f f ( ) �  ��� � r   4 7 � � � m   4 5 � � � � �   � o      ���� 0 t  ��   �  ��� � e   8 E � � b   8 E � � � b   8 C � � � b   8 A � � � b   8 ? � � � m   8 9 � � � � �  { " o n " : � l  9 > ����� � =  9 > � � � 1   9 <��
�� 
pPlS � m   < =��
�� ePlSkPSP��  ��   � m   ? @   �  , " t r a c k " : " � o   A B���� 0 t   � m   C D �  " }��   � m     �                                                                                      @ alis    "  macmini                        BD ����	Music.app                                                      ����            ����  
 cu             Applications   /:System:Applications:Music.app/   	 M u s i c . a p p    m a c m i n i  System/Applications/Music.app   / ��   �  l     ��������  ��  ��    i    	
	 I      ������ "0 setplayervolume setPlayerVolume �� o      �� 0 v  ��  ��  
 O      k      r    	 o    �~�~ 0 v   1    �}
�} 
pVol �| e   
  b   
  b   
  m   
  �  { " v o l u m e " : 1    �{
�{ 
pVol m     �  }�|   m     �                                                                                      @ alis    "  macmini                        BD ����	Music.app                                                      ����            ����  
 cu             Applications   /:System:Applications:Music.app/   	 M u s i c . a p p    m a c m i n i  System/Applications/Music.app   / ��     l     �z�y�x�z  �y  �x    !"! i    #$# I      �w%�v�w 0 setspeakeron setSpeakerOn% &'& o      �u�u 0 sp  ' (�t( o      �s�s 0 o  �t  �v  $ O     4)*) k    3++ ,-, r    ./. 6   010 4   �r2
�r 
AFSp2 m    �q�q 1 =  	 343 1   
 �p
�p 
pnam4 o    �o�o 0 sp  / o      �n�n 0 s  - 565 Z    +78�m97 o    �l�l 0 o  8 k    #:: ;<; I   �k=�j
�k .RAAFConnnull���     ****= o    �i�i 0 s  �j  < >�h> I   #�g?�f
�g .sysodelanull��� ��� nmbr? m    @@ @       �f  �h  �m  9 I  & +�eA�d
�e .RAAFDiscnull���     ****A o   & '�c�c 0 s  �d  6 B�bB e   , 3CC b   , 3DED b   , 1FGF m   , -HH �II  { " o n " :G n   - 0JKJ 1   . 0�a
�a 
ConnK o   - .�`�` 0 s  E m   1 2LL �MM  }�b  * m     NN�                                                                                  RAss  alis    .  macmini                        BD ����Airfoil.app                                                    ����            ����  
 cu             	Utilities   %/:Applications:Utilities:Airfoil.app/     A i r f o i l . a p p    m a c m i n i  "Applications/Utilities/Airfoil.app  / ��  " OPO l     �_�^�]�_  �^  �]  P QRQ i    STS I      �\U�[�\ $0 setspeakervolume setSpeakerVolumeU VWV o      �Z�Z 0 sp  W X�YX o      �X�X 0 v  �Y  �[  T O     (YZY k    '[[ \]\ r    ^_^ 6   `a` 4   �Wb
�W 
AFSpb m    �V�V a =  	 cdc 1   
 �U
�U 
pnamd o    �T�T 0 sp  _ o      �S�S 0 s  ] efe r    ghg ^    iji o    �R�R 0 v  j m    �Q�Q dh l     k�P�Ok n      lml 1    �N
�N 
Vol m o    �M�M 0 s  �P  �O  f n�Ln e    'oo b    'pqp b    %rsr m    tt �uu  { " v o l u m e " :s l   $v�K�Jv c    $wxw ]    "yzy l    {�I�H{ n     |}| 1     �G
�G 
Vol } o    �F�F 0 s  �I  �H  z m     !�E�E dx m   " #�D
�D 
long�K  �J  q m   % &~~ �  }�L  Z m     ���                                                                                  RAss  alis    .  macmini                        BD ����Airfoil.app                                                    ����            ����  
 cu             	Utilities   %/:Applications:Utilities:Airfoil.app/     A i r f o i l . a p p    m a c m i n i  "Applications/Utilities/Airfoil.app  / ��  R ��� l     �C�B�A�C  �B  �A  � ��� i    ��� I      �@�?�>�@ $0 getspeakerstates getSpeakerStates�?  �>  � k     K�� ��� r     ��� m     �� ���  ,� 1    �=
�= 
txdl� ��<� O    K��� k   
 J�� ��� r   
 ��� J   
 �;�;  � o      �:�: 0 sp  � ��� X    @��9�� s   ! ;��� b   ! 8��� b   ! 6��� b   ! .��� b   ! ,��� b   ! (��� b   ! &��� m   ! "�� ���  "� n   " %��� 1   # %�8
�8 
pnam� o   " #�7�7 0 s  � m   & '�� ���  " : { " o n " :� n   ( +��� 1   ) +�6
�6 
Conn� o   ( )�5�5 0 s  � m   , -�� ���  , " v o l u m e " :� l  . 5��4�3� c   . 5��� ]   . 3��� l  . 1��2�1� n   . 1��� 1   / 1�0
�0 
Vol � o   . /�/�/ 0 s  �2  �1  � m   1 2�.�. d� m   3 4�-
�- 
long�4  �3  � m   6 7�� ���  }� n      ���  ;   9 :� o   8 9�,�, 0 sp  �9 0 s  � l   ��+�*� 2    �)
�) 
AFSp�+  �*  � ��(� e   A J�� b   A J��� b   A F��� m   A D�� ���  {� o   D E�'�' 0 sp  � m   F I�� ���  }�(  � m    ���                                                                                  RAss  alis    .  macmini                        BD ����Airfoil.app                                                    ����            ����  
 cu             	Utilities   %/:Applications:Utilities:Airfoil.app/     A i r f o i l . a p p    m a c m i n i  "Applications/Utilities/Airfoil.app  / ��  �<  � ��� l     �&�%�$�&  �%  �$  � ��� i    ��� I      �#��"�#  0 setaudiosource setAudioSource� ��!� o      � �  0 a  �!  �"  � k     5�� ��� r     ��� l    
���� n     
��� 1    
�
� 
psxp� l    ���� I    ���
� .earsffdralis        afdr� 4     ��
� 
capp� o    �� 0 a  �  �  �  �  �  � o      �� 0 p  � ��� O    5��� Z    4����� >   ��� n    ��� 1    �
� 
pnam� 1    �
� 
CurA� o    �� 0 a  � k    0�� ��� r    $��� I   "���
� .corecrel****      � null�  � ���
� 
kocl� m    �
� 
AAud�  � o      �
�
 0 s  � ��� r   % *��� o   % &�	�	 0 p  � n      ��� 1   ' )�
� 
AFil� o   & '�� 0 s  � ��� r   + 0��� o   + ,�� 0 s  � 1   , /�
� 
CurA�  �  �  � m    ���                                                                                  RAss  alis    .  macmini                        BD ����Airfoil.app                                                    ����            ����  
 cu             	Utilities   %/:Applications:Utilities:Airfoil.app/     A i r f o i l . a p p    m a c m i n i  "Applications/Utilities/Airfoil.app  / ��  �  � ��� l     ����  �  �  � ��� l     � ���   �   on setAllSpeakersOff()   � ��� .   o n   s e t A l l S p e a k e r s O f f ( )� ��� l     �� ��    C = 	tell application "Airfoil" to disconnect from every speaker    � z   	 t e l l   a p p l i c a t i o n   " A i r f o i l "   t o   d i s c o n n e c t   f r o m   e v e r y   s p e a k e r�  l     ����     end setAllSpeakersOff    � ,   e n d   s e t A l l S p e a k e r s O f f �� l     ��������  ��  ��  ��       
��	
��  	 ������������������ 0 getstate getState�� 0 setplayeron setPlayerOn�� 0 changetrack changeTrack�� "0 setplayervolume setPlayerVolume�� 0 setspeakeron setSpeakerOn�� $0 setspeakervolume setSpeakerVolume�� $0 getspeakerstates getSpeakerStates��  0 setaudiosource setAudioSource
 �� '�������� 0 getstate getState�� ����   ���� 0 i  ��   �������� 0 i  �� 0 sp  �� 0 t    3���������� M������ V j o�� q s u y
�� 
prun
�� 
bool�� $0 getspeakerstates getSpeakerStates
�� 
pPlS
�� ePlSkPSP��  0 setaudiosource setAudioSource
�� 
pTrk
�� 
pnam
�� 
pVol�� e�
 	��,e �& U*j+ E�O� E*�,�   � ) *�k+ UY hO*�,�,E�Y �E�O�*�,� %�%*�,%�%�%�%�%a %UY a  �� ��������� 0 setplayeron setPlayerOn�� ����   ������ 0 o  �� 0 t  ��   ������ 0 o  �� 0 t    � ������������������� � � � ���  0 setaudiosource setAudioSource
�� 
cTrk
�� .hookPlaynull��� ��� obj 
�� 
pMut
�� .hookStopnull��� ��� null
�� 
pPlS
�� ePlSkPSP
�� 
pTrk
�� 
pnam�� P� L� ) *�k+ UO*�/j Of*�,FY *j O*�,�  *�,�,E�Y �E�O�*�,� %�%�%�%U �� ��������� 0 changetrack changeTrack�� ����   ���� 0 n  ��   ������ 0 n  �� 0 t   ������������ � � 
�� 
pPlS
�� ePlSkPSP
�� .hookNextnull��� ��� null
�� .hookPrevnull��� ��� null
�� 
pTrk
�� 
pnam�� G� C*�,�  � 
*j Y *j Y hO*�,�  *�,�,E�Y �E�O�*�,� %�%�%�%U ��
�������� "0 setplayervolume setPlayerVolume�� ����   ���� 0 v  ��   ���� 0 v   ��
�� 
pVol�� � �*�,FO�*�,%�%U ��$�������� 0 setspeakeron setSpeakerOn�� �� ��    ������ 0 sp  �� 0 o  ��   �������� 0 sp  �� 0 o  �� 0 s   N��!����@����H��L
�� 
AFSp!  
�� 
pnam
�� .RAAFConnnull���     ****
�� .sysodelanull��� ��� nmbr
�� .RAAFDiscnull���     ****
�� 
Conn�� 5� 1*�k/�[�,\Z�81E�O� �j O�j Y �j O��,%�%U ��T����"#���� $0 setspeakervolume setSpeakerVolume�� ��$�� $  ������ 0 sp  �� 0 v  ��  " �������� 0 sp  �� 0 v  �� 0 s  # 	���!������t��~
�� 
AFSp
�� 
pnam�� d
�� 
Vol 
�� 
long�� )� %*�k/�[�,\Z�81E�O��!��,FO��,� �&%�%U �������%&���� $0 getspeakerstates getSpeakerStates��  ��  % ������ 0 sp  �� 0 s  & ����������������������������
�� 
txdl
�� 
AFSp
�� 
kocl
�� 
cobj
�� .corecnte****       ****
�� 
pnam
�� 
Conn
�� 
Vol �� d
�� 
long�� L�*�,FO� BjvE�O 0*�-[��l kh ��,%�%��,%�%��,� �&%�%�6G[OY��Oa �%a %U �������'(����  0 setaudiosource setAudioSource�� ��)�� )  ���� 0 a  ��  ' ������� 0 a  �� 0 p  � 0 s  ( 
�~�}�|��{�z�y�x�w�v
�~ 
capp
�} .earsffdralis        afdr
�| 
psxp
�{ 
CurA
�z 
pnam
�y 
kocl
�x 
AAud
�w .corecrel****      � null
�v 
AFil�� 6*�/j �,E�O� %*�,�,� *��l E�O���,FO�*�,FY hUascr  ��ޭ